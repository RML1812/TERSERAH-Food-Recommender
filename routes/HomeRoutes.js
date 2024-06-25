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
const {createMLModel, getTopCulinaryTypes, testModel} = require("../function/mlFunction")
const router = express.Router();

//point home
router.get('/', checkAuth, async (req, res) => {
    try {
        const userLogin = req.session.userLogin;
        const culinaryTypes = await CulinaryTypeView.find();
        const paymentMethods = await PaymentMethodView.find();
        const availableFacilities = await AvailableFacilityView.find();
        const priceRange = await PriceRangeView.find();
        let recommendedRestaurants = [];

        if (!userLogin || userLogin._id === 1 || userLogin.restaurants.length === 0) {
            recommendedRestaurants = await Restaurant.aggregate([
                { $match: { overall_rating: { $gte: 4.5, $lte: 5.0 } } },
                { $sample: { size: 5 } },
                { $sort: { overall_rating: -1 } },
            ]);
        } else {
            console.log("disni")
            const recommendedRestaurantIds = await testModel(userLogin._id, 4);
            recommendedRestaurants = await Restaurant.find({ _id: { $in: recommendedRestaurantIds } }).limit(5);
        }

        res.status(200).json({
            message: `Halo, ${userLogin.name}`,
            title: "Home",
            userLogin,
            culinaryTypes,
            paymentMethods,
            availableFacilities,
            priceRange,
            recommendedRestaurants,
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
        let recommendedRestaurants = [];
        if (!userLogin || userLogin._id === 1 || userLogin.restaurants.length === 0) {
            recommendedRestaurants = await Restaurant.aggregate([
                { $match: { overall_rating: { $gte: 4.5, $lte: 5.0 } } },
                { $sample: { size: 4 } },
                { $sort: { overall_rating: -1 } },
            ]);
        }
        else {
            const recommendedRestaurantIds = await testModel(userLogin._id, 20);
            recommendedRestaurants = await Restaurant.find({ _id: { $in: recommendedRestaurantIds } });
        }

        res.status(200).json({
            message: `Rekomendasi untuk, ${userLogin.name}`,
            title: "Home",
            recommendedRestaurants,
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