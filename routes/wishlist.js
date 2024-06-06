const express = require('express');
const User = require("../model/user")
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const Wishlist = require("../model/wishlist")
const router = express.Router();

//menampilkan semua wishlish dari user
router.get('/wishlist', async (req, res) => {
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
router.post('/wishlist', async (req, res) => {
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
router.post('/delete-wishlist', async (req, res) => {
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


module.exports = router;