const express = require('express');
const bcrypt = require('bcryptjs');
const { RestaurantACC } = require("../model/restaurantACC");
const { TempRejectedRestaurant } = require("../model/tempRejectedRestaurant");
const { TempRestaurantACC } = require("../model/tempRestaurantACC");
const router = express.Router();

// Render login page
router.get('/restaurant-dashboard/login', (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (restaurantLogin && restaurantLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${restaurantLogin.restaurant_name}` });
    }

    res.status(200).json({
        title: "Restaurant Login",
    });
});

// Handle login
router.post('/restaurant-dashboard/login', async (req, res) => {
    try {
        // Check in RestaurantACC database
        const restaurant = await RestaurantACC.findOne({ email: req.body.email });

        if (!restaurant) {
            // If not found in RestaurantACC, check in TempRejectedRestaurant
            const tempRejectedRestaurant = await TempRejectedRestaurant.findOne({ email: req.body.email });

            if (!tempRejectedRestaurant) {
                // If not found in TempRejectedRestaurant, check in TempRestaurantACC
                const tempRestaurant = await TempRestaurantACC.findOne({ email: req.body.email });

                if (!tempRestaurant) {
                    return res.status(404).json({ message: "Email not found" });
                }

                // If found in TempRestaurantACC, validate password
                const passwordMatch = await bcrypt.compare(req.body.password, tempRestaurant.password);

                if (passwordMatch) {
                    req.session.restaurantLogin = tempRestaurant;
                    return res.status(200).json({
                        message: "Login successful",
                        user: {
                            id: tempRestaurant._id,
                            name: tempRestaurant.restaurant_name,
                            // status: "Pending"
                        }
                    });
                } else {
                    return res.status(400).json({ message: "Incorrect password" });
                }
            }

            // If found in TempRejectedRestaurant, validate password
            const passwordMatch = await bcrypt.compare(req.body.password, tempRejectedRestaurant.password);

            if (passwordMatch) {
                req.session.restaurantLogin = tempRejectedRestaurant;
                return res.status(200).json({
                    message: "Login successful",
                    user: {
                        id: tempRejectedRestaurant._id,
                        name: tempRejectedRestaurant.restaurant_name,
                        // status: "Failed"
                    }
                });
            } else {
                return res.status(400).json({ message: "Incorrect password" });
            }
        }

        // If found in RestaurantACC, validate password
        const passwordMatch = await bcrypt.compare(req.body.password, restaurant.password);

        if (passwordMatch) {
            req.session.restaurantLogin = restaurant;
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: restaurant._id,
                    name: restaurant.restaurant_name,
                }
            });
        } else {
            res.status(400).json({ message: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle logout
router.get('/restaurant-dashboard/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/account/restaurant/login');
        }
    });
});

module.exports = router;
