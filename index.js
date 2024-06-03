const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const path = require("path")
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express()
const brain = require('brain.js');
const tf = require('@tensorflow/tfjs');
require("./mongo")

//model dari db
const User = require("./model/user")
const {Rating} = require("./model/rating")
const {Restaurant,
    CulinaryTypeView,
    PaymentMethodView,
    AvailableFacilityView,
    PriceRangeView} = require("./model/restaurant")
const {Review} = require("./model/review")
const Wishlist = require("./model/wishlist")
const {Menu} = require("./model/menu.js")
const {Transaction} = require("./model/transaction.js")
const {Reservation} = require("./model/reservation.js")

const {getRandomRestaurants} = require("./function.js")

//port yang digunakan
const port = process.env.PORT || 3000

//apa saja yang diuse
app.use(express.json())
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }))

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
console.log(publicPath);


//view engine menggunakan ejs
app.set('view engine', 'ejs')

//session
app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false
}));

// Middleware untuk memeriksa apakah pengguna sudah masuk atau belum
const checkAuth = (req, res, next) => {
    if (req.session.userLogin) {
        // Jika pengguna sudah masuk, lanjutkan ke rute berikutnya
        next();
    } else {
        // Jika pengguna belum masuk, alihkan ke halaman login atau beri respon lainnya
        req.session.userLogin = { _id: 1, name: 'dummy'}; // Akun dummy
        next();
    }
};

const createMLModel = async () => {
    const users = await User.find().populate('restaurants');
    const restaurants = await Restaurant.find();

    const dataset = users.map(user => {
        const restaurantCounts = restaurants.reduce((acc, restaurant) => {
            acc[restaurant.culinary_type] = 0;
            return acc;
        }, {});

        user.restaurants.forEach(restaurantId => {
            const restaurant = restaurants.find(rest => rest._id.equals(restaurantId));
            if (restaurant) {
                restaurantCounts[restaurant.culinary_type]++;
            }
        });

        return {
            input: Object.values(restaurantCounts),
            output: user.preferredCulinaryType // Assuming this is a field in user schema
        };
    });

    // Membuat dan melatih model
    // Memuat model pretrained, misalnya MobileNet
    const baseModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    // Membekukan lapisan model dasar
    baseModel.layers.forEach(layer => layer.trainable = false);

     // Get unique culinary types from the restaurants
    const uniqueCulinaryTypes = [...new Set(restaurants.map(restaurant => restaurant.culinary_type))];
    const numCategories = uniqueCulinaryTypes.length;

    // const numCategories = new Set(users.map(user => user.preferredCulinaryType)).size;
    if (numCategories !== restaurants.length) {
        throw new Error('Number of categories does not match number of restaurants.');
    }

    // Create the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [dataset[0].input.length], units: 64, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 })); // Add dropout for regularization
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: numCategories, activation: 'softmax' }));

    // Compile the model
    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.adam(0.001), // Adjust learning rate
        metrics: ['accuracy']
    });

    

    // Prepare the data
    const inputs = dataset.map(data => data.input);
    // Map each user's preferred culinary type to an index
    const outputs = dataset.map(data => {
        const index = uniqueCulinaryTypes.indexOf(data.output);
        return Array(numCategories).fill(0).map((_, i) => i === index ? 1 : 0);
    });

    // Train the model with added callbacks
    await model.fit(tf.tensor2d(inputs), outputs, {
        epochs: 10,
        callbacks: [
            tf.callbacks.earlyStopping({ monitor: 'loss' }),
            {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`);
                }
            }
        ]
    });

    return model;
};

const getTopCulinaryTypes = async (user, net) => {
    const restaurants = await Restaurant.find();

    const restaurantCounts = restaurants.reduce((acc, restaurant) => {
        acc[restaurant.culinary_type] = 0;
        return acc;
    }, {});

    if (user.restaurants && user.restaurants.length > 0) {
        user.restaurants.forEach(restaurantId => {
            const restaurant = restaurants.find(rest => rest._id.equals(restaurantId));
            if (restaurant) {
                restaurantCounts[restaurant.culinary_type]++;
            }
        });
    }

    const prediction = net.predict(tf.tensor2d([Object.values(restaurantCounts)]));
    const topCulinaryTypes = await prediction.data();
    const topIndexes = Array.from(topCulinaryTypes)
        .map((prob, index) => ({ probability: prob, index }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 4)
        .map(item => restaurants[item.index].culinary_type);

    return topIndexes;
};

async function migrateRatings() {
    try {
        const restaurants = await Restaurant.find();

        for (const restaurant of restaurants) {
            const individualRatings = restaurant.individual_rating.split(',').map(parseFloat);

            // Asumsi bahwa urutan rating adalah sesuai dengan skema baru
            const rating = new Rating({
                restaurant_id: restaurant._id,
                combined_rating: restaurant.overall_rating,
                ambience_rating: individualRatings[0],
                taste_to_price_rating: individualRatings[1],
                service_rating: individualRatings[2],
                cleanliness_rating: individualRatings[3]
            });
            restaurant.rating_id = rating._id;
            await restaurant.save();

            await rating.save();
        }

        console.log('Ratings migration completed');
    } catch (error) {
        console.error('Error migrating ratings', error);
    } 
}

async function updateRestaurantReferences() {
    try {
        const restaurants = await Restaurant.find();

        for (const restaurant of restaurants) {
            if (restaurant.rating_id) {
                await Restaurant.findByIdAndUpdate(restaurant._id, {
                    $unset: { individual_rating: "" } // Remove the individual_rating field
                });
            }
        }

        console.log('Updated restaurant references and removed individual_rating');
    } catch (error) {
        console.error('Error updating restaurant references', error);
    }
}

// migrateRatings().then(updateRestaurantReferences);


//point home (belum beres, belum menampilkan machine learningnya) 
app.get('/', checkAuth, async (req, res) => {
    try {
        const userLogin = req.session.userLogin;
        const culinaryTypes = await CulinaryTypeView.find();
        const paymentMethods = await PaymentMethodView.find();
        const availableFacilities = await AvailableFacilityView.find();
        const priceRange = await PriceRangeView.find();

        const topRestaurants = await Restaurant.aggregate([
            { $match: { overall_rating: { $gte: 4.5, $lte: 5.0 } } },
            { $sample: { size: 4 } },
            { $sort: { overall_rating: -1 } },
        ]);

        // const net = await createMLModel();
        // const topCulinaryTypes = await getTopCulinaryTypes(userLogin, net);

        // const dominantRestaurants = await Restaurant.find({ culinary_type: { $in: topCulinaryTypes } }).limit(4);

        res.render('home', {
            layout: "./layouts/main_layouts",
            title: "Home",
            topRestaurants,
            userLogin,
            culinaryTypes,
            paymentMethods,
            availableFacilities,
            priceRange,
            // dominantRestaurants
        });
    } catch (error) {
        console.error("Error on GET /:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//pilihan lebih banyak (belum beres, belum menampilkan machine learningnya) ---(blm)---
app.get('/rekomendasi',  async (req, res) => {
    try {
        //menampilkan top 12 restaurant
        const userLogin = req.session.userLogin;
        const culinaryTypes = await CulinaryTypeView.find();
        const paymentMethods = await PaymentMethodView.find();
        const availableFacilities = await AvailableFacilityView.find();
        const priceRange = await PriceRangeView.find();
        const topRestaurants = await Restaurant.aggregate([
            { $match: { overall_rating: { $gte: 4.5, $lte: 5.0 } } },
            { $sample: { size: 20 } }, 
            { $sort: { overall_rating: -1 } }
        ]);

        res.render('home', {
            layout: "./layouts/main_layouts",
            title: "Home",
            topRestaurants,
            userLogin,
            culinaryTypes,
            paymentMethods,
            availableFacilities,
            priceRange
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//render login
app.get('/login', (req, res) => {
    const userLogin = req.session.userLogin;

    if (userLogin && userLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${userLogin.name}` });
    }

    res.render('login', {
        layout: "./layouts/main_layouts",
        title: "Login",
    });
});

//melakukan login
app.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ name: req.body.name });
        
        if (!user) {
            res.send("User name not found");
            return;
        }

        // Compare the hashed password with the plaintext password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (passwordMatch) {
            req.session.userLogin = user; 
            res.redirect('/');
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

app.get('/logout', (req, res) => {
    // Hapus session pengguna dan alihkan ke halaman login atau halaman lainnya
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//render signup
app.get('/signup', (req, res) => {
    const userLogin = req.session.userLogin;

    if (userLogin) {
        if (userLogin._id == "1") {
            res.render('signup', {
                layout : "./layouts/main_layouts",
                title : "Sign Up",
            })
            return;
        } else {
            return res.status(200).json({ message: `Anda telah login ${userLogin.name}` });
        }
    }

    res.render('signup', {
        layout : "./layouts/main_layouts",
        title : "Sign Up",
    })
})

//melakukan signup
app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.name,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
        email: req.body.email,
        jenisKelamin: req.body.jenisKelamin,
        tanggalLahir: req.body.tanggalLahir,
        noHP: req.body.noHP,
        domisili: req.body.domisili,
    }

    const existingUser = await User.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
        return;
    } else if(data.password != data.repeatPassword){
        res.send('Password tidak sama');
        return;
    }else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replace the original password with the hashed one
        const userdata = await User.insertMany(data);
        res.redirect('/login');
    }
})

//terserahin (dari domisili, diambil 4 random) 
app.get('/terserahin',  async (req, res) => {
    try {

        res.render('terserahin', {
            layout : "./layouts/main_layouts",
            title : "Terserahin",
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//melakukan terserahin aja
app.get('/terserahinAja', async (req, res) => {
    const { address } = req.query;
    let query = {
        overall_rating: { $gte: 4.5, $lte: 5.0 }
    };

    // Add filter based on provided address parameter
    if (address) {
        query.address = { $regex: new RegExp(`.*${address}.*`, "i") };
    }

    try {
        // Search for the restaurants by the constructed query
        const restaurants = await Restaurant.aggregate([
            { $match: query }, 
            { $sample: { size: 4 } }, 
        ]);

        // const restaurants = await Restaurant.find(query).limit(4).sort({$random: 1});

        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found matching the criteria" });
        }

        // res.status(200).json(restaurants);
        res.render('search', {
            layout : "./layouts/main_layouts",
            title : 'Terserahin',
            restaurants
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//melakukan search (filtering belom, tinggal nambahin dari database) ---(blm)---
app.get('/search', async (req, res) => {
    const { name, overall_rating, culinary_type, location, price_range, available_facilities, payment } = req.query;
    let query = {};

    // Add filters based on provided parameters
    if (name) {
        query.name = { $regex: new RegExp(`.*${name}.*`, "i") };
    }
    if (culinary_type) {
        query.culinary_type = culinary_type;
    }
    if (overall_rating) {
        query.overall_rating = overall_rating;
    }
    if (location) {
        query.location = location;
    }
    if (price_range) {
        query.price_range = price_range;
    }
    if (available_facilities) {
        query.available_facilities = available_facilities;
    }
    if (payment) {
        query.payment = payment;
    }

    try {
        // Search for the restaurants by the constructed query
        const restaurants = await Restaurant.find(query);

        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found matching the criteria" });
        }

        // res.status(200).json(restaurants);
        res.render('search', {
            layout : "./layouts/main_layouts",
            title : `Restaurant Found`,
            restaurants
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//mengambil detail dari restaurant berdasarkan id (id diambil oleh front end)
app.get('/restaurants/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    const userLogin = req.session.userLogin;

    try {
        // Cari restoran berdasarkan ID
        const restaurant = await Restaurant.findById(restaurantId);
        // Cari menu yang memiliki link yang sama dengan restaurant
        const menu = await Menu.findOne({ link : restaurant.link });

        if (!(userLogin._id.toString() === "1")) {    
            // Masukin ke ML
            const user = await User.findById(userLogin._id);
            if (!restaurant) {
                return res.status(404).json({ error: "Restaurant tidak ditemukan" });
            }
    
            if (!user.restaurants.includes(restaurantId)) {
                user.restaurants.push(restaurantId);
                await user.save();
            }
            // Masukin ke ML
        }
        
        const rating = await Rating.findById(restaurant.rating_id);

        // Render halaman dengan data restaurant dan menu
        res.render('restaurant', {
            layout : "./layouts/main_layouts",
            title : 'Restaurant',
            restaurant,
            rating,
            menu 
        })
        
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});


// Rute untuk menambahkan restoran baru ---(blm)--- implementasi
app.post('/restaurants', async (req, res) => {
    const { name, culinary_type, address, link, is_branch, payment_methods, price_range, open_schedule, available_facilities, unavailable_facilities, phone, overall_rating, individual_rating } = req.body;

    try {
        const newRestaurant = new Restaurant({
            name,
            culinary_type,
            address,
            link,
            is_branch,
            payment_methods,
            price_range,
            open_schedule,
            available_facilities,
            unavailable_facilities,
            phone,
            overall_rating,
            individual_rating: individual_rating.split(',').map(Number) // Mengonversi rating menjadi array angka
        });

        await Restaurant.insertMany(data);
        // await newRestaurant.save();
        res.status(201).json({ message: "Restoran berhasil ditambahkan", restaurant: newRestaurant });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

// Rute untuk menghapus restoran berdasarkan ID ---(blm)--- implementasi
app.delete('/restaurants/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({ error: "Restoran tidak ditemukan" });
        }

        res.status(200).json({ message: "Restoran berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

//mengambil profile user
app.get('/user/:id', async (req, res) => {
    const userLogin = req.session.userLogin;

    if (!userLogin) {
        return res.redirect('/login');
    }

    if (userLogin._id.toString() === "1") {
        // Jika ID pengguna adalah "1", redirect ke halaman utama
        return res.redirect('/login');
    }

    try {
        res.render('profile', {
            layout : "./layouts/main_layouts",
            title : 'Profile',
            userLogin
        })
        
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" }).redirect('/');
    }
});

//menampilkan semua wishlish dari user
app.get('/wishlist', async (req, res) => {
    const userLogin = req.session.userLogin;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    if (userLogin._id.toString() === "1") {
        // Jika ID pengguna adalah "1", redirect ke halaman utama
        return res.redirect('/login');
    }

    try {
        const wishlist = await Wishlist.findOne({ user_id: userLogin._id }).populate('restaurant_id');

        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist tidak ditemukan" });
        }

        const restaurants = wishlist.restaurant_id;

        res.render('wishlist', {
            layout: "./layouts/main_layouts",
            title: "Wishlist Anda",
            restaurants: restaurants
        });
    } catch (error) {
        console.error("Error saat mengambil wishlist:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

//untuk add wishlish
app.post('/wishlist', async (req, res) => {
    const userLogin = req.session?.userLogin;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    if (userLogin._id.toString() === "1") {
        return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    const restaurantId = req.body.restaurantId

    if (!restaurantId) {
        return res.status(400).json({ error: "Restaurant ID diperlukan" });
    }

    try {
        const wishlist = await Wishlist.findOne({ user_id: userLogin._id });
        if (!wishlist) {
            const newWishlist = new Wishlist({
                user_id: userLogin._id,
                restaurant_id: [restaurantId]
            });
            await newWishlist.save();
        } else {
            if (!wishlist.restaurant_id.includes(restaurantId)) {
                wishlist.restaurant_id.push(restaurantId);
                await wishlist.save();
            }
        }

        //masukin ke ml
        const user = await User.findById(userLogin._id);
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant tidak ditemukan" });
        }

        if (!user.restaurants.includes(restaurantId)) {
            user.restaurants.push(restaurantId);
            await user.save();
        }
        //masukin ke ml

        res.status(200).json({ message: "Wishlist berhasil diunggah" });
    } catch (error) {
        console.error("Error mengunggah wishlist:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// Endpoint untuk menghapus wishlist
app.post('/delete-wishlist', async (req, res) => {
    const userLogin = req.session?.userLogin;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    const { restaurantId } = req.body;

    if (!restaurantId) {
        return res.status(400).json({ error: "Restaurant ID diperlukan" });
    }

    try {
        const wishlist = await Wishlist.findOne({ user_id: userLogin._id });
        if (wishlist) {
            const index = wishlist.restaurant_id.indexOf(restaurantId);
            if (index > -1) {
                wishlist.restaurant_id.splice(index, 1);
                await wishlist.save();
                return res.redirect('/wishlist');
            } else {
                return res.status(404).json({ error: "Restaurant ID tidak ditemukan dalam wishlist" });
            }
        } else {
            return res.status(404).json({ error: "Wishlist tidak ditemukan" });
        }
    } catch (error) {
        console.error("Error menghapus wishlist:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// POST /review - add review baru
app.post('/review/:restaurantId', async (req, res) => {
    const userLogin = req.session?.userLogin;
    const { restaurantId } = req.params;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    const { review, reviewDate, title } = req.body;
    const { combined_rating,
        ambience_rating,
        taste_to_price_rating,
        service_rating,
        cleanliness_rating } = req.body;

    try {

        const newRating= new Rating({
            combined_rating,
            ambience_rating,
            taste_to_price_rating,
            service_rating,
            cleanliness_rating
        });

        await newRating.save()        
        
        const newReview = new Review({
            rating_id: newRating._id,
            user_id: userLogin._id,
            restaurant_id: restaurantId,
            review,
            review_date: reviewDate,
            title
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// menampilkan tempat buat add review
app.get('/add-review/:restaurantId',  async (req, res) => {
    const userLogin = req.session.userLogin;
    const { restaurantId } = req.params;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    if (userLogin._id.toString() === "1") {
        // Jika ID pengguna adalah "1", redirect ke halaman utama
        return res.redirect('/login');
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        res.render('add_review', {
            layout: "./layouts/main_layouts",
            title: "Adding Review",
            userLogin,
            restaurant
        });
    } catch (error) {
        console.error("Error saat mengambil wishlist:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// POST /delete-review - Delete review
app.post('/delete-review', async (req, res) => {
    const userLogin = req.session?.userLogin;

    if (!userLogin || userLogin._id == "1") {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    const { reviewId } = req.body;

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ error: "Review tidak ditemukan" });
        }

        if (review.user_id.toString() !== userLogin._id.toString()) {
            return res.status(403).json({ error: "Anda tidak memiliki izin untuk menghapus review ini" });
        }

        await Review.deleteOne({ _id: reviewId });
        res.status(200).json({ message: "Review berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

app.get('/edit-review/:reviewId',  async (req, res) => {
    const userLogin = req.session.userLogin;
    const { reviewId } = req.params;

    if (!userLogin || userLogin._id.toString() === "1"){
        return res.redirect('/');
    }

    try {
        const review = await Review.findById(reviewId);
        const rating = await Rating.findById(review.rating_id);

        res.render('edit_review', {
            layout: "./layouts/main_layouts",
            title: "Adding Review",
            userLogin,
            review,
            rating
        });
    } catch (error) {
        console.error("Error saat mengambil wishlist:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// POST /edit-review - Edit review 
app.post('/edit-review/:reviewId', async (req, res) => {
    const userLogin = req.session?.userLogin;
    const { reviewId } = req.params;


    if (!userLogin || userLogin._id == "1"){
        return res.redirect('/');
    }

    const { review, reviewDate, title } = req.body;
    const { combined_rating,
        ambience_rating,
        taste_to_price_rating,
        service_rating,
        cleanliness_rating } = req.body;

    try {
        const existingReview = await Review.findById(reviewId);

        if (!existingReview) {
            return res.status(404).json({ error: "Review tidak ditemukan" });
        }

        if (existingReview.user_id.toString() !== userLogin._id.toString()) {
            return res.status(403).json({ error: "Anda tidak memiliki izin untuk mengedit review ini" });
        }

        const existingRatingRewiew = await Rating.findById(existingReview.rating_id);

        existingRatingRewiew.combined_rating = combined_rating;
        existingRatingRewiew.ambience_rating = ambience_rating;
        existingRatingRewiew.taste_to_price_rating = taste_to_price_rating;
        existingRatingRewiew.service_rating = service_rating;
        existingRatingRewiew.cleanliness_rating = cleanliness_rating;
        
        
        existingReview.review = review;
        existingReview.review_date = reviewDate;
        existingReview.title = title;
        
        await existingRatingRewiew.save();
        await existingReview.save();
        res.redirect(`/user/${userLogin._id}`)
    } catch (error) {
        console.error("Error editing review:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// Menampilkan review dari restaurant
app.get('/review/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const reviews = await Review.find({ restaurant_id: restaurantId })
                                    .populate('user_id', 'name')
                                    .populate('restaurant_id')
                                    .populate('rating_id');

        if (!reviews) {
            return res.status(404).json({ error: "Review tidak ditemukan" });
        }
        res.render('review', {
            layout : "./layouts/main_layouts",
            title : 'Review',
            reviews,
            restaurantId
        })
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// Menampilkan reviews dari user
app.get('/review/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {

        const reviews = await Review.find({ user_id: userId })
                                    .populate('restaurant_id')
                                    .populate('user_id')
                                    .populate('rating_id');

        if (!reviews) {
            return res.status(404).json({ error: "Review tidak ditemukan" });
        }

        res.render('reviewUser', {
            layout : "./layouts/main_layouts",
            title : 'Review',
            reviews,
        })
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

app.post('/reservation/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    const userLogin = req.session.userLogin;
    const { tanggalReservation, name, jumlahOrang, noHP, waktuMulai, waktuSelesai } = req.body;

    // Calculate the total price
    const hargaPerOrang = 5000;
    const durasiReservasi = new Date(`1970-01-01T${waktuSelesai}`) - new Date(`1970-01-01T${waktuMulai}`);
    const durasiMenit = durasiReservasi / 60000; 
    const totalHarga = jumlahOrang * hargaPerOrang + Math.ceil(durasiMenit / 60) * 20000;

    try {
        const newReservation = new Reservation({
            user_id: userLogin._id,
            restaurant_id: restaurantId,
            tanggalReservation,
            name,
            jumlahOrang,
            noHP,
            totalHarga,
            waktuMulai,
            waktuSelesai
        });
        await newReservation.save();

        const newTransaction = new Transaction({
            user_id: userLogin._id,
            restaurant_id: restaurantId,
            reservation_id: newReservation._id, // Link the transaction to the reservation
            status: 'Pending' // Default status is 'Pending'
        });
        await newTransaction.save();
        res.redirect('/');
        // res.redirect('/transaction midtransnya');
    } catch (error) {
        res.status(400).send(error);
    }

        
});

// POST endpoint to delete a reservation
app.post('/delete-reservation', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.body.id_reservation);
        if (!reservation) {
            return res.status(404).send();
        }
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve reservations by user ID
app.get('/reservation/:user_id', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        const reservations = await Reservation.find({ user_id: req.params.user_id });
        res.render('yourReservation', {
            layout: "./layouts/main_layouts",
            title: "Your Reservations",
            reservations, // Pass the reservations data to the frontend
            userLogin // Assuming req.user contains the logged-in user's data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve a single reservation by reservation ID
app.get('/reservation/detail/:id_reservation', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        const reservation = await Reservation.findById(req.params.id_reservation);
        if (!reservation) {
            return res.status(404).send();
        }
        res.render('detailReservation', {
            layout: "./layouts/main_layouts",
            title: "Reservation Details",
            reservation, // Pass the single reservation data to the frontend
            userLogin // Assuming req.user contains the logged-in user's data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getReservation/:restaurantId', async (req, res) => {

    const userLogin = req.session.userLogin;
    const { restaurantId } = req.params;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    if (userLogin._id.toString() === "1") {
        // Jika ID pengguna adalah "1", redirect ke halaman utama
        return res.redirect('/login');
    }

    try {
        res.render('reservation', {
            layout: "./layouts/main_layouts",
            title: "Reservation",
            userLogin,
            restaurantId
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log('port connected');
})

