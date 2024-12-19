const express = require('express');
const { Restaurant } = require("../model/restaurant"); // Import Restaurant model
const {Rating} = require("../model/rating")
const { Review } = require("../model/review");
const router = express.Router();
const Wishlist = require("../model/wishlist");
const { Reservation } = require("../model/reservation");
const User = require("../model/user")
const bcrypt = require('bcryptjs');

// Handle dashboard page (display restaurant data)
router.get('/restaurant-dashboard', async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect('/restaurant-dashboard/login');
    }

    try {
        // Cari restoran berdasarkan login
        const restaurant = await Restaurant.findOne({ name: restaurantLogin.restaurant_name });
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Hitung jumlah wishlist
        const wishlistCount = await Wishlist.countDocuments({ restaurant_id: restaurant._id });

        // Ambil rentang tanggal dari query parameter (jika ada)
        const startDate = req.query.start_date ? new Date(req.query.start_date) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endDate = req.query.end_date ? new Date(req.query.end_date) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        // Waktu saat ini
        const now = new Date();
        const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

        // Reservasi sebelumnya (Previous)
        const previousReservations = await Reservation.find({
            restaurant_id: restaurant._id,
            $or: [
                { tanggalReservation: { $lt: localNow.toISOString().split('T')[0] } }, // Tanggal sudah berlalu
                {
                    tanggalReservation: { $eq: localNow.toISOString().split('T')[0] }, // Tanggal hari ini
                    waktuSelesai: { $lt: localNow.toISOString().split('T')[1] }, // Waktu selesai sudah lewat
                }
            ]
        }).populate('user_id');

        // Reservasi sedang berlangsung (Ongoing)
        const ongoingReservations = await Reservation.find({
            restaurant_id: restaurant._id,
            tanggalReservation: { $eq: localNow.toISOString().split('T')[0] }, // Tanggal hari ini
            waktuMulai: { $lte: localNow.toISOString().split('T')[1] }, // Sudah dimulai
            waktuSelesai: { $gte: localNow.toISOString().split('T')[1] } // Belum selesai
        }).populate('user_id');

        // Reservasi mendatang (Upcoming)
        const nextReservations = await Reservation.find({
            restaurant_id: restaurant._id,
            $or: [
                { tanggalReservation: { $gt: localNow.toISOString().split('T')[0] } }, // Tanggal mendatang
                {
                    tanggalReservation: { $eq: localNow.toISOString().split('T')[0] }, // Tanggal hari ini
                    waktuMulai: { $gt: localNow.toISOString().split('T')[1] } // Waktu belum dimulai
                }
            ]
        }).populate('user_id');

        // Hitung total reservasi
        const totalReservations = await Reservation.countDocuments({
            restaurant_id: restaurant._id
        });

        // Hitung total pemasukan
        const totalIncome = await Reservation.aggregate([
            {
                $match: {
                    restaurant_id: restaurant._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalHarga" }
                }
            }
        ]);

        // Total pemasukan
        const totalRevenue = totalIncome.length ? totalIncome[0].totalRevenue : 0;

        // Dapatkan rating dan komentar
        const ratings = await Rating.find({ _id: restaurant.rating_id });

        // Dapatkan Review Restaurant
        const reviews = await Review.find({ restaurant_id: restaurant._id })
            .populate("user_id", "name") 
            .populate("rating_id");     

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
            reviews: reviews, // Tambahkan reviews ke response
            totalUserInteractions: totalUserInteractions, // Tambahkan total interaksi user
            startDate: req.query.start_date || '',
            endDate: req.query.end_date || '',
            previousReservations: previousReservations, // Tambahkan previous reservations
            ongoingReservations: ongoingReservations,   // Tambahkan ongoing reservations
            nextReservations: nextReservations,         // Tambahkan next reservations
            selectedDate: req.query.date || ''
        });
    } catch (error) {
        console.error("Error handling restaurant dashboard:", error);
        res.status(500).send("Internal server error");
    }
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
router.post("/restaurant-dashboard/edit-konten", async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.redirect("/restaurant-dashboard/login");
    }

    try {
        // Ambil data restoran saat ini
        const restaurant = await Restaurant.findOne({ name: restaurantLogin.restaurant_name });
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Ambil jadwal yang sudah ada di database
        const existingSchedule = JSON.parse(restaurant.open_schedule || "{}");

        // Jadwal baru dari payload
        const newSchedule = req.body.open_schedule || {};

        // Gabungkan jadwal baru dengan jadwal lama
        for (const [day, times] of Object.entries(newSchedule)) {
            if (times.closed === true || times.closed === "true") {
                existingSchedule[day] = { Closed: true }; // Perbarui menjadi "Closed"
            } else {
                existingSchedule[day] = {
                    open: times.open || existingSchedule[day]?.open || "",
                    close: times.close || existingSchedule[day]?.close || "",
                };
            }
        }

        // Data lain yang akan diperbarui
        const updatedData = {
            culinary_type: Array.isArray(req.body.culinary_type)
                ? req.body.culinary_type.join(", ") // Gabungkan array menjadi string
                : req.body.culinary_type,
            address: req.body.address,
            link: req.body.link,
            is_branch: req.body.is_branch === "on", // Handle checkbox
            payment_methods: Array.isArray(req.body.payment_methods)
                ? req.body.payment_methods.join(", ") // Gabungkan array menjadi string
                : req.body.payment_methods,
            price_range: req.body.price_range,
            open_schedule: JSON.stringify(existingSchedule), // Simpan jadwal gabungan
            available_facilities: Array.isArray(req.body.available_facilities)
                ? req.body.available_facilities.join(", ") // Gabungkan array menjadi string
                : req.body.available_facilities,
            unavailable_facilities: Array.isArray(req.body.unavailable_facilities)
                ? req.body.unavailable_facilities.join(", ") // Gabungkan array menjadi string
                : req.body.unavailable_facilities,
            phone: req.body.phone,
            slot: req.body.slot,
        };

        // Perbarui data restoran di database
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { name: restaurantLogin.restaurant_name },
            updatedData,
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Kembalikan jadwal dalam format objek
        updatedRestaurant.open_schedule = JSON.parse(updatedRestaurant.open_schedule);

        // Kirim respon sukses
        res.status(200).json({
            message: "Restaurant updated successfully",
            restaurant: updatedRestaurant,
        });
    } catch (error) {
        console.error("Error updating restaurant data:", error);
        return res.status(500).send("Internal server error");
    }
});


router.put('/restaurant-dashboard', async (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (!restaurantLogin) {
        return res.status(401).send("Unauthorized access.");
    }

    try {
        // Cari restoran berdasarkan sesi login
        const restaurant = await Restaurant.findOne({ name: restaurantLogin.restaurant_name });
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Ambil nilai `is_live` dari permintaan
        const { is_live } = req.body;

        // Validasi input
        if (typeof is_live !== 'boolean') {
            return res.status(400).send("Invalid input: 'is_live' must be a boolean.");
        }

        // Perbarui status `is_live`
        restaurant.is_live = is_live;
        await restaurant.save();

        res.status(200).json({ success: true, message: "Restaurant status updated successfully.", is_live: restaurant.is_live });
    } catch (error) {
        console.error("Error updating restaurant status:", error);
        res.status(500).send("Internal server error.");
    }
});

module.exports = router;
