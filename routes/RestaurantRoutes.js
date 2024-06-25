const express = require('express');
const User = require("../model/user");
const { Rating } = require("../model/rating");
const { Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView } = require("../model/restaurant");
const { Menu } = require("../model/menu.js");
const router = express.Router();

// Melakukan search
router.get('/search', async (req, res) => {
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

        res.status(200).json({
            message: "Restaurants Found",
            title: "Restaurant Found",
            restaurants
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Mengambil detail dari restaurant berdasarkan id
router.get('/restaurant/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    const userLogin = req.session.userLogin;

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        const menu = await Menu.findOne({ link: restaurant.link });

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant tidak ditemukan" });
        }

        if (userLogin && userLogin._id.toString() !== "1") {
            const user = await User.findById(userLogin._id);
            if (!user.restaurants.includes(restaurantId)) {
                user.restaurants.push(restaurantId);
                await user.save();
            }
        }

        const rating = await Rating.findById(restaurant.rating_id);

        res.status(200).json({
            message: "Restaurant Details",
            title: 'Restaurant',
            restaurant,
            rating,
            menu
        });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

// Rute untuk menambahkan restoran baru //bblm
router.post('/restaurant', async (req, res) => {
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

        await newRestaurant.save();
        res.status(201).json({ message: "Restoran berhasil ditambahkan", restaurant: newRestaurant });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

// Rute untuk menghapus restoran berdasarkan ID //blm
router.delete('/restaurant/:id', async (req, res) => {
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

module.exports = router;
