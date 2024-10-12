const express = require('express');
const bcrypt = require('bcrypt');
const { RestaurantACC } = require("../model/restaurantACC");
const { TempRestaurantACC } = require("../model/tempRestaurantACC");
const { Restaurant } = require("../model/restaurant"); // Import Restaurant model
const {Rating} = require("../model/rating")
const router = express.Router();

// Render signup page
router.get('/restaurant-dashboard/signup', (req, res) => {
    const restaurantLogin = req.session.restaurantLogin;

    if (restaurantLogin) {
        return res.status(200).json({ message: `Anda telah login ${restaurantLogin.restaurant_name}` });
    }

    // Render signup page with layout
    res.render('signupRestaurant', {
        layout: "./layouts/main_layouts",
        title: "Restaurant Signup",
    });
});

// Handle signup
router.post('/restaurant-dashboard/signup', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
        restaurant_name: req.body.restaurant_name,
        phone_number: req.body.phone_number,
        business_type: req.body.business_type,
        company_name: req.body.company_name,
        full_address: req.body.full_address,
        npwp: req.body.npwp,
        npwp_photo: req.body.npwp_photo,
        full_name: req.body.full_name,
        nik: req.body.nik,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        personal_phone: req.body.personal_phone,
        domicile: req.body.domicile,
        ktp_photo: req.body.ktp_photo
    };

    // try {
        // Check if the email is already registered
        const existingRestaurant = await RestaurantACC.findOne({ email: data.email });
        const existingTempRestaurant = await TempRestaurantACC.findOne({ email: data.email });

        if (existingRestaurant) {
            return res.status(400).send('Restaurant with this email already exists.');
        } else if (existingTempRestaurant) {
            return res.status(400).send('Restaurant with this email already exists.');
        } else if (data.password !== data.repeatPassword) {
            return res.status(400).send('Passwords do not match.');
        } else {
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;

            // Create new restaurant account
            const newTempRestaurantACC = new TempRestaurantACC(data);
            await newTempRestaurantACC.save();

            // const newRating = new Rating({
            //     combined_rating: 4,
            //     ambience_rating: 4,
            //     taste_to_price_rating: 4,
            //     service_rating: 4,
            //     cleanliness_rating: 4
            // });
            // await newRating.save();

            // // Create corresponding entry in Restaurant collection
            // const newRestaurant = new Restaurant({
            //     name: newRestaurantACC.restaurant_name,
            //     culinary_type: '', // Default value, can be updated later
            //     address: '',
            //     link: '',
            //     is_branch: false,
            //     payment_methods: '',
            //     price_range: '',
            //     open_schedule: '',
            //     available_facilities: '',
            //     unavailable_facilities: '',
            //     phone: '',
            //     overall_rating: 0,
            //     individual_rating: '',
            //     rating_id: newRating._id, // Assuming a rating system to be implemented later
            //     slot: 30 // Default slot
            // });
            // await newRestaurant.save();

            // Redirect to login after successful signup
            res.redirect('/restaurant-dashboard/login');
        }
    // } catch (error) {
    //     res.status(500).send("Internal server error");
    // }
});

module.exports = router;
