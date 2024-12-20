const express = require('express');
const { Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView } = require("../model/restaurant")
const router = express.Router();

// terserahin (from user's location, pick 4 random)
router.get('/terserahin', async (req, res) => {
  try {
    // Implement logic to choose 4 random restaurants based on user's location (replace with your implementation)
    const restaurants = []; // Replace with your logic to get 4 random restaurants

    if (restaurants.length === 0) {
      return res.status(404).json({ error: "No restaurants found" });
    }

    // Respond with JSON containing the chosen restaurants
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// terserahin but based on address query parameter
router.get('/terserahinAja', async (req, res) => {
  const { address } = req.query;
  let query = {
    overall_rating: { $gte: 4.5 , $lte: 5.0 }
  };

  // Add filter based on provided address parameter
  if (address) {
    query.address = { $regex: new RegExp(`.*${address}.*`, "i") };
  }

  try {
    // Search for the restaurants by the constructed query
    const restaurants = await Restaurant.aggregate([
      { $match: query },
      { $sample: { size: 10 } },
    ]);

    if (restaurants.length === 0) {
      return res.status(404).json({ error: "No restaurants found matching the criteria" });
    }

    // Respond with JSON containing the chosen restaurants
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
