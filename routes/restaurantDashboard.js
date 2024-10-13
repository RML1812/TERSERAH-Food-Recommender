const express = require('express');
const {Rating} = require("../model/rating")
const router = express.Router();
const Wishlist = require("../model/wishlist");
const { Reservation } = require("../model/reservation");
const User = require("../model/user");
const { TempRestaurant } = require("../model/tempRestaurant");
const {isRestaurant, isAdmin, isUser } = require("../function/access");
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const {Menu} = require("../model/menu.js")
const multer = require('multer');
const axios = require('axios'); 
const path = require('path'); // Tambahkan ini untuk mengimpor modul path
const fs = require('fs');
const FormData = require('form-data');

const storage = multer.memoryStorage(); // Memory storage untuk menampung file di buffer
const upload = multer({ storage: storage });

// Handle dashboard page (display restaurant data)
router.get('/restaurant-dashboard', isRestaurant,async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    // Cari restoran di koleksi Restaurant
    let restaurant = await Restaurant.findOne({ _id : restaurantLogin.id_restaurant });

    // Jika tidak ditemukan, cari di koleksi TempRestaurant
    if (!restaurant) {
        restaurant = await TempRestaurant.findOne({ _id : restaurantLogin.id_restaurant });
    }

    // Jika tetap tidak ditemukan di TempRestaurant, kirimkan error
    if (!restaurant) {
        return res.status(404).send("Restaurant not found");
    }
    // try {
        // Hitung jumlah wishlist
        const wishlistCount = await Wishlist.countDocuments({ restaurant_id: restaurant._id });

        // Ambil rentang tanggal dari query parameter (jika ada)
        const startDate = req.query.start_date ? new Date(req.query.start_date) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endDate = req.query.end_date ? new Date(req.query.end_date) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        
        const selectedDate = req.query.date ? new Date(req.query.date) : new Date();
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)); // Awal hari
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)); // Akhir hari


        // Reservasi sebelumnya (Previous)
        const ongoingReservations = await Reservation.find({
            restaurant_id: restaurant._id,
            tanggalReservation: { $eq: selectedDate } // Ganti dengan logika tanggal yang diinginkan
        }).populate('user_id'); // Populate untuk mendapatkan data pengguna
    
        const previousReservations = await Reservation.find({
            restaurant_id: restaurant._id,
            tanggalReservation: { $lt: selectedDate }
        }).populate('user_id');
    
        const nextReservations = await Reservation.find({
            restaurant_id: restaurant._id,
            tanggalReservation: { $gt: selectedDate }
        }).populate('user_id');

        // Hitung total reservasi dan total pemasukan sesuai rentang waktu
        const totalReservations = await Reservation.countDocuments({
            restaurant_id: restaurant._id,
            tanggalReservation: {
                $gte: startDate.toISOString().split('T')[0], // Mengonversi Date ke format YYYY-MM-DD
                $lt: endDate.toISOString().split('T')[0]     // Mengonversi Date ke format YYYY-MM-DD
            }
        });

        const totalIncome = await Reservation.aggregate([
            {
                $match: {
                    restaurant_id: restaurant._id,
                    tanggalReservation: {
                        $gte: startDate.toISOString().split('T')[0], // Mengonversi Date ke format YYYY-MM-DD
                        $lt: endDate.toISOString().split('T')[0]     // Mengonversi Date ke format YYYY-MM-DD
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalHarga" }
                }
            }
        ]);

        const totalRevenue = totalIncome.length ? totalIncome[0].total : 0;

        // Dapatkan rating dan komentar
        const ratings = await Rating.find({ _id: restaurant.rating_id });

        // Hitung total interaksi user terhadap restoran
        const totalUserInteractions = await User.aggregate([
            { $match: { restaurants: restaurant._id } }, // Cocokkan user yang punya restaurant id
            { $unwind: "$restaurants" },                 // Pisahkan array restaurants menjadi dokumen individual
            { $match: { restaurants: restaurant._id } }, // Cocokkan lagi setelah unwind untuk mendapatkan semua kemunculan
            { $count: "totalInteractions" }              // Hitung total interaksi
        ]);
        
        const interactionCount = totalUserInteractions.length > 0 ? totalUserInteractions[0].totalInteractions : 0;
        
        // const totalUserInteractions = await User.countDocuments({
        //     restaurants: { $elemMatch: { $eq: restaurant._id } }
        // });

        // Render dashboard dengan data tambahan
        res.render('restaurantDashboard', {
            layout: "./layouts/main_layouts",
            title: 'Restaurant Dashboard',
            restaurantLogin: restaurantLogin,
            restaurant: restaurant,
            wishlistCount: wishlistCount,
            totalReservations: totalReservations,
            totalRevenue: totalRevenue,
            ratings: ratings,
            totalUserInteractions: interactionCount, // Tambahkan total interaksi user
            startDate: req.query.start_date || '',
            endDate: req.query.end_date || '',
            previousReservations: previousReservations, // Tambahkan previous reservations
            ongoingReservations: ongoingReservations,   // Tambahkan ongoing reservations
            nextReservations: nextReservations,         // Tambahkan next reservations
            selectedDate: req.query.date || ''
        });
    // } catch (error) {
    //     return res.status(500).send("Internal server error");
    // }
});


// Handle editing restaurant data (render form)
router.get('/restaurant-dashboard/edit-konten', isRestaurant,async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    // try {
        // Cari restoran di koleksi Restaurant
        let restaurant = await Restaurant.findOne({ _id : restaurantLogin.id_restaurant });

        // Jika tidak ditemukan, cari di koleksi TempRestaurant
        if (!restaurant) {
            restaurant = await TempRestaurant.findOne({ _id : restaurantLogin.id_restaurant });
        }

        // Jika tetap tidak ditemukan di TempRestaurant, kirimkan error
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        const culinaryTypes = await CulinaryTypeView.find({});
        const paymentMethods = await PaymentMethodView.find({});
        const availableFacilities = await AvailableFacilityView.find({});
        const priceRanges = await PriceRangeView.find({});
        const menu = await Menu.findOne({ link: restaurant.link });

        // Render edit page with current restaurant data
        res.render('editRestaurant', {
            layout: "./layouts/main_layouts",
            title : 'Edit Dashboard',
            restaurant: restaurant,
            culinaryTypes,  // kirim data kategori ke view
            paymentMethods,
            availableFacilities,
            priceRanges,
            menu,  
        });
    // } catch (error) {
    //     return res.status(500).send("Internal server error");
    // }
});

// Handle updating restaurant data
router.post('/restaurant-dashboard/edit-konten', isRestaurant,async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    const updatedData = {
        culinary_type: req.body.culinary_type,
        address: req.body.address,
        link: req.body.link,
        is_branch: req.body.is_branch === 'on',
        payment_methods: Array.isArray(req.body.payment_methods) 
                          ? req.body.payment_methods.join(',') 
                          : req.body.payment_methods,
        price_range: req.body.price_range,
        open_schedule: req.body.open_schedule,
        available_facilities: Array.isArray(req.body.available_facilities) 
                              ? req.body.available_facilities.join(',') 
                              : req.body.available_facilities,
        unavailable_facilities: req.body.unavailable_facilities,
        phone: req.body.phone,
        slot: req.body.slot
    };
    

    try {
        let restaurant = await Restaurant.findOne({ _id: restaurantLogin.id_restaurant });

        if (restaurant) {
            // Jika ditemukan di koleksi Restaurant, update di sana
            restaurant = await Restaurant.findOneAndUpdate(
                { _id: restaurantLogin.id_restaurant },
                updatedData,
                { new: true }
            );
            await Menu.findOneAndUpdate(
                { _id: restaurant.menu_id },  // Gunakan menu_id dari restoran
                { link: req.body.link },  // Update link menu
                { new: true }
            );
        } else {
            // Jika tidak ditemukan di koleksi Restaurant, cek di TempRestaurant
            let restaurant = await TempRestaurant.findOne({ _id: restaurantLogin.id_restaurant });

            if (restaurant) {
                // Jika ditemukan di TempRestaurant, update di TempRestaurant
                restaurant = await TempRestaurant.findOneAndUpdate(
                    { _id: restaurantLogin.id_restaurant },
                    updatedData,
                    { new: true }
                );
                await Menu.findOneAndUpdate(
                    { _id: restaurant.menu_id },  // Gunakan menu_id dari restoran
                    { link: req.body.link },  // Update link menu
                    { new: true }
                );
            } else {
                // Jika tidak ditemukan di kedua koleksi, kirimkan error
                return res.status(404).send("Restaurant not found.");
            }
        }

        res.redirect('/restaurant-dashboard');
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

router.post('/restaurant-dashboard/move-to-live', isRestaurant,async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    try {
        let tempRestaurant = await Restaurant.findOne({ _id : restaurantLogin.id_restaurant });

        // Jika tidak ditemukan, cari di koleksi TempRestaurant
        if (!tempRestaurant) {
            tempRestaurant = await TempRestaurant.findOne({ _id : restaurantLogin.id_restaurant });
        }

        // Jika tetap tidak ditemukan di TempRestaurant, kirimkan error
        if (!tempRestaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        if (!tempRestaurant || !tempRestaurant.is_live) {
            return res.status(400).send("Restaurant is not ready to go live.");
        }

        // Pindahkan data dari TempRestaurant ke Restaurant
        const restaurant = new Restaurant({
            name: tempRestaurant.name,
            culinary_type: tempRestaurant.culinary_type,
            address: tempRestaurant.address,
            link: tempRestaurant.link,
            is_branch: tempRestaurant.is_branch,
            payment_methods: tempRestaurant.payment_methods,
            price_range: tempRestaurant.price_range,
            open_schedule: tempRestaurant.open_schedule,
            available_facilities: tempRestaurant.available_facilities,
            unavailable_facilities: tempRestaurant.unavailable_facilities,
            phone: tempRestaurant.phone,
            overall_rating: tempRestaurant.overall_rating,
            individual_rating: tempRestaurant.individual_rating,
            rating_id: tempRestaurant.rating_id,
            slot: tempRestaurant.slot
        });

        await restaurant.save();
        await TempRestaurant.deleteOne({ _id: tempRestaurant._id });

        res.redirect('/restaurant-dashboard');
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

router.post('/restaurant-dashboard/toggle-live', isRestaurant,async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    try {
        // Cari restoran di koleksi Restaurant terlebih dahulu
        let restaurant = await Restaurant.findOne({ _id : restaurantLogin.id_restaurant });

        // Jika tidak ditemukan di Restaurant, cari di TempRestaurant
        let tempRestaurant;
        if (!restaurant) {
            tempRestaurant = await TempRestaurant.findOne({ _id : restaurantLogin.id_restaurant });
        }

        // Jika tidak ditemukan di kedua koleksi, kirimkan error
        if (!restaurant && !tempRestaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Fungsi untuk memvalidasi apakah semua data sudah lengkap
        const isContentComplete = (restaurantData) => {
            return (
                restaurantData.name &&
                restaurantData.culinary_type &&
                restaurantData.address &&
                restaurantData.link &&
                restaurantData.is_branch !== undefined && // Cek boolean
                restaurantData.payment_methods &&
                restaurantData.price_range &&
                restaurantData.open_schedule &&
                restaurantData.available_facilities &&
                restaurantData.unavailable_facilities &&
                restaurantData.phone &&
                restaurantData.overall_rating !== undefined && // Cek angka
                restaurantData.individual_rating &&
                restaurantData.rating_id &&
                restaurantData.slot !== undefined // Cek angka
            );
        };

        // Jika restoran ditemukan di TempRestaurant dan ingin di-*live* kan
        if (tempRestaurant && !tempRestaurant.is_live) {
            // Cek apakah semua konten yang dibutuhkan sudah terisi
            if (!isContentComplete(tempRestaurant)) {
                return res.status(400).send("All required fields must be filled to go live.");
            }

            // Pindahkan dari TempRestaurant ke Restaurant
            const newRestaurant = new Restaurant({
                _id: tempRestaurant._id,
                name: tempRestaurant.name,
                culinary_type: tempRestaurant.culinary_type,
                address: tempRestaurant.address,
                link: tempRestaurant.link,
                is_branch: tempRestaurant.is_branch,
                payment_methods: tempRestaurant.payment_methods,
                price_range: tempRestaurant.price_range,
                open_schedule: tempRestaurant.open_schedule,
                available_facilities: tempRestaurant.available_facilities,
                unavailable_facilities: tempRestaurant.unavailable_facilities,
                phone: tempRestaurant.phone,
                overall_rating: tempRestaurant.overall_rating,
                individual_rating: tempRestaurant.individual_rating,
                rating_id: tempRestaurant.rating_id,
                slot: tempRestaurant.slot,
                menu_id : tempRestaurant.menu_id,
                is_live: true // Set is_live menjadi true
            });

            await newRestaurant.save();
            await TempRestaurant.deleteOne({ _id: tempRestaurant._id });

        // Jika restoran ditemukan di Restaurant dan ingin di-*hide* (pindah ke TempRestaurant)
        } else if (restaurant && restaurant.is_live) {
            // Pindahkan dari Restaurant ke TempRestaurant
            const newTempRestaurant = new TempRestaurant({
                _id: restaurant._id,
                name: restaurant.name,
                culinary_type: restaurant.culinary_type,
                address: restaurant.address,
                link: restaurant.link,
                is_branch: restaurant.is_branch,
                payment_methods: restaurant.payment_methods,
                price_range: restaurant.price_range,
                open_schedule: restaurant.open_schedule,
                available_facilities: restaurant.available_facilities,
                unavailable_facilities: restaurant.unavailable_facilities,
                phone: restaurant.phone,
                overall_rating: restaurant.overall_rating,
                individual_rating: restaurant.individual_rating,
                rating_id: restaurant.rating_id,
                slot: restaurant.slot,
                menu_id : restaurant.menu_id,
                is_live: false // Set is_live menjadi false
            });

            await newTempRestaurant.save();
            await Restaurant.deleteOne({ _id: restaurant._id });
        }

        res.redirect('/restaurant-dashboard');
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

router.get('/restaurant-dashboard/upload-menu', async (req, res) => {
    // try {
        // Mengambil data menu dari database berdasarkan link
        const restaurantLogin = req.session.restaurantLogin;

        if (!restaurantLogin) {
            return res.redirect('/restaurant-dashboard/login');
        }
    
        // Cari restoran di koleksi Restaurant
        let restaurant = await Restaurant.findOne({ _id : restaurantLogin.id_restaurant });

        if (!restaurant) {
            restaurant = await TempRestaurant.findOne({ _id : restaurantLogin.id_restaurant });
        } 
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        let menu = await Menu.findOne({ _id: restaurant.menu_id });

        if (!menu) {
            return res.status(404).send('Menu not found');
        }

        // Pisahkan gallery_link menjadi array berdasarkan ';'
        const galleryUrls = menu.gallery_link ? menu.gallery_link.split(';') : [];
        const menuUrl = menu.menu_link || '';

        // Render halaman EJS untuk menampilkan gallery dan menu serta form untuk upload
        res.render('uploadMenuRestaurant', { 
            layout: "./layouts/main_layouts",
            title: 'Restaurant Menu Upload',
            galleryUrls, 
            menuUrl 
        });
    // } catch (error) {
    //     console.error('Error fetching menu:', error);
    //     res.status(500).send('Error fetching gallery and menu.');
    // }
});

router.post('/restaurant-dashboard/upload-menu', upload.fields([
    { name: 'new_gallery_images', maxCount: 10 },
    { name: 'new_menu_image', maxCount: 1 }
]), async (req, res) => {
    // try {
        // Cari menu berdasarkan link
        const restaurantLogin = req.session.restaurantLogin;

        if (!restaurantLogin) {
            return res.redirect('/restaurant-dashboard/login');
        }

        // Cari restoran di koleksi Restaurant
        let restaurant = await Restaurant.findOne({ _id : restaurantLogin.id_restaurant });

        // Jika tidak ditemukan, cari di koleksi TempRestaurant
        if (!restaurant) {
            restaurant = await TempRestaurant.findOne({ _id : restaurantLogin.id_restaurant });
        }

        // Jika tetap tidak ditemukan di TempRestaurant, kirimkan error
        if (!restaurant) {
            return res.status(404).send("Restaurant not found");
        }

        let menu = await Menu.findOne({ _id: restaurant.menu_id });

        // Cek apakah ada file untuk gallery images
        if (req.files && req.files.new_gallery_images) {
            console.log('Ada gallery images:', req.files.new_gallery_images);
            const galleryUrls = [];
            const files = req.files.new_gallery_images;

            for (let file of files) {
                const formData = new FormData();
                formData.append('image', file.buffer.toString('base64')); // Menggunakan buffer langsung
                formData.append('key', '405bd08a220d4742bf46f1d54fc67241'); // Ganti dengan API key Anda

                const imgbbRes = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    headers: formData.getHeaders()
                });

                galleryUrls.push(imgbbRes.data.data.url);
                console.log('sampe galleryUrls masuk')
            }

            // Update atau buat menu dengan gallery_link
            if (menu) {
                console.log('sampe menu masuk')
                menu.gallery_link = galleryUrls.join(';');
                await menu.save();
            } else {
                menu = new Menu({
                    link: req.body.link,
                    gallery_link: galleryUrls.join(';'),
                });
                await menu.save();
            }
        } else {
            console.log('Belum ada file gallery yang diunggah.');
        }

        // Proses menu image
        if (req.files && req.files.new_menu_image) {
            const formData = new FormData();
            formData.append('image', req.files.new_menu_image[0].buffer.toString('base64')); // Menggunakan buffer langsung
            formData.append('key', '405bd08a220d4742bf46f1d54fc67241');

            const imgbbRes = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: formData.getHeaders()
            });
            console.log('sampe imgbbRes masuk')
            // Update atau buat menu dengan menu_link
            if (menu) {
                console.log('sampe menu masuk')
                menu.menu_link = imgbbRes.data.data.url;
                await menu.save();
                console.log(menu)
            } else {
                menu = new Menu({
                    link: req.body.link,
                    menu_link: imgbbRes.data.data.url,
                });
                await menu.save();
            }
        }

        res.send('Images uploaded successfully!');
    // } catch (error) {
    //     console.error('Error during image upload:', error);
    //     res.status(500).send('Error uploading images.');
    // }
});


module.exports = router;
