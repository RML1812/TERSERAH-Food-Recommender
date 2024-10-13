const express = require('express');
const {Rating} = require("../model/rating")
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const {Review} = require("../model/review")
const User = require("../model/user")
const router = express.Router();


// POST /review - add review baru
router.post('/review/:restaurantId', async (req, res) => {
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

        const user = await User.findById(userLogin._id);
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant tidak ditemukan" });
        }

        user.restaurants.push(restaurantId);
        await user.save();

        res.redirect(`/restaurants/${restaurantId}`)
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Kesalahan server internal" });
    }
});

// menampilkan tempat buat add review
router.get('/add-review/:restaurantId',  async (req, res) => {
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
router.post('/delete-review', async (req, res) => {
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

router.get('/edit-review/:reviewId',  async (req, res) => {
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
router.post('/edit-review/:reviewId', async (req, res) => {
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
router.get('/review/:restaurantId', async (req, res) => {
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
router.get('/review/user/:userId', async (req, res) => {
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

module.exports = router;