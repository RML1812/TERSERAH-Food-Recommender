const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const path = require("path")
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express()
const brain = require('brain.js');
const tf = require('@tensorflow/tfjs');
const User = require("../model/user")
const {Rating} = require("../model/rating")
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const {Review} = require("../model/review")
const Wishlist = require("../model/wishlist")
const {Menu} = require("../model/menu.js")
const {Transaction} = require("../model/transaction.js")
const {Reservation} = require("../model/reservation.js")
const {migrateRatings, updateRestaurantReferences, checkAuth, snap} = require("../function/function")
const router = express.Router();

//point home
router.get('/', checkAuth, async (req, res) => {
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
router.get('/rekomendasi',  async (req, res) => {
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

module.exports = router;