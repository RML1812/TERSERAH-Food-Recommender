const express = require('express');
const { Restaurant } = require("../model/restaurant"); // Import Restaurant model
const {Rating} = require("../model/rating")
const router = express.Router();
const Wishlist = require("../model/wishlist");
const { Reservation } = require("../model/reservation");
const User = require("../model/user")

// Handle dashboard page (display restaurant data)
router.get('/restaurant-dashboard', async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    const restaurant = await Restaurant.findOne({ name: restaurantLogin.restaurant_name });
    if (!restaurant) {
        return res.status(404).send("Restaurant not found.");
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
        const totalUserInteractions = await User.countDocuments({
            restaurants: restaurant._id
        });

        // Render dashboard dengan data tambahan
        res.status(200).json({
            title: 'Restaurant Dashboard',
            restaurantLogin: restaurantLogin,
            restaurant: restaurant,
            wishlistCount: wishlistCount,
            totalReservations: totalReservations,
            totalRevenue: totalRevenue,
            ratings: ratings,
            totalUserInteractions: totalUserInteractions, // Tambahkan total interaksi user
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
router.get('/restaurant-dashboard/edit-konten', async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    try {
        const restaurant = await Restaurant.findOne({ name: restaurantLogin.restaurant_name });

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Render edit page with current restaurant data
        res.status(200).json({
            title : 'Edit Dashboard',
            restaurant: restaurant
        });
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

// Handle updating restaurant data
router.post('/restaurant-dashboard/edit-konten', async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    const updatedData = {
        culinary_type: req.body.culinary_type,
        address: req.body.address,
        link: req.body.link,
        is_branch: req.body.is_branch === 'on', // Checkbox handling
        payment_methods: req.body.payment_methods,
        price_range: req.body.price_range,
        open_schedule: req.body.open_schedule,
        available_facilities: req.body.available_facilities,
        unavailable_facilities: req.body.unavailable_facilities,
        phone: req.body.phone,
        // overall_rating: req.body.overall_rating,
        // individual_rating: req.body.individual_rating,
        slot: req.body.slot
    };

    try {
        const restaurant = await Restaurant.findOneAndUpdate(
            { name: restaurantLogin.restaurant_name },
            updatedData,
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Redirect back to dashboard after successful update
        res.redirect('/restaurant-dashboard');
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;
