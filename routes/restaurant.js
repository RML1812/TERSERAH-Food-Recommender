const express = require('express');
const User = require("../model/user")
const {Rating} = require("../model/rating")
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const {Menu} = require("../model/menu.js")
const router = express.Router();

//melakukan search (filtering belom, tinggal nambahin dari database) ---(blm)---
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
router.get('/restaurants/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    const userLogin = req.session.userLogin;

    try {
        // Cari restoran berdasarkan ID
        // await Restaurant.updateMany({}, { $set: { slot: 30 } });
        const restaurant = await Restaurant.findById(restaurantId);
        // Cari menu yang memiliki link yang sama dengan restaurant
        const menu = await Menu.findOne({ link : restaurant.link });

        if (!(userLogin._id.toString() === "1")) {    
            // Masukin ke ML
            const user = await User.findById(userLogin._id);
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) {
                return res.status(404).json({ error: "Restaurant tidak ditemukan" });
            }

            user.restaurants.push(restaurantId);
            await user.save();
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
router.post('/restaurants', async (req, res) => {
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
router.delete('/restaurants/:id', async (req, res) => {
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