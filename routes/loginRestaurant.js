const express = require('express');
const bcrypt = require('bcryptjs');
const { RestaurantACC } = require("../model/restaurantACC");
const router = express.Router();

// Render login page
router.get('/restaurant-dashboard/login', (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (restaurantLogin && restaurantLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${restaurantLogin.restaurant_name}` });
    }

    res.render('loginRestaurant', {
        layout: "./layouts/main_layouts",
        title: "Restaurant Login",
    });
});

// Handle login
router.post('/restaurant-dashboard/login', async (req, res) => {
    try {
        const restaurant = await RestaurantACC.findOne({ email: req.body.email });

        if (!restaurant) {
            return res.status(404).send("Email not found");
        }

        const passwordMatch = await bcrypt.compare(req.body.password, restaurant.password);

        if (passwordMatch) {
            req.session.restaurantLogin = restaurant;
            res.redirect('/restaurant-dashboard/');
        } else {
            res.status(400).send("Incorrect password");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// Handle logout
router.get('/restaurant-dashboard/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
