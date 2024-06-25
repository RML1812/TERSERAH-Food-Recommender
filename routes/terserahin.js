const express = require('express');
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const router = express.Router();

//terserahin (dari domisili, diambil 4 random) 
router.get('/terserahin',  async (req, res) => {
    try {

        res.render('terserahin', {
            layout : "./layouts/main_layouts",
            title : "Terserahin",
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//melakukan terserahin aja
router.get('/terserahinAja', async (req, res) => {
    const { address } = req.query;
    let query = {
        overall_rating: { $gte: 4.5, $lte: 5.0 }
    };

    // Add filter based on provided address parameter
    if (address) {
        query.address = { $regex: new RegExp(`.*${address}.*`, "i") };
    }

    try {
        // Search for the restaurants by the constructed query
        const restaurants = await Restaurant.aggregate([
            { $match: query }, 
            { $sample: { size: 4 } }, 
        ]);

        // const restaurants = await Restaurant.find(query).limit(4).sort({$random: 1});

        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found matching the criteria" });
        }

        // res.status(200).json(restaurants);
        res.render('search', {
            layout : "./layouts/main_layouts",
            title : 'Terserahin',
            restaurants
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;