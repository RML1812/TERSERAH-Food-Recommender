const express = require('express');
const bcrypt = require('bcrypt');
const { RestaurantACC } = require("../model/restaurantACC");
const { TempRestaurantACC } = require("../model/tempRestaurantACC");
const { TempRejectedRestaurant } = require("../model/tempRejectedRestaurant");
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
    res.status(200).json({
        title: "Restaurant Signup",
    });
});

// // Handle signup
// router.post('/restaurant-dashboard/signup', async (req, res) => {
//     const data = {
//         email: req.body.email,
//         password: req.body.password,
//         repeatPassword: req.body.repeatPassword,
//         restaurant_name: req.body.restaurant_name,
//         phone_number: req.body.phone_number,
//         business_type: req.body.business_type,
//         company_name: req.body.company_name,
//         full_address: req.body.full_address,
//         npwp: req.body.npwp,
//         npwp_photo: req.body.npwp_photo,
//         full_name: req.body.full_name,
//         nik: req.body.nik,
//         gender: req.body.gender,
//         birth_date: req.body.birth_date,
//         personal_phone: req.body.personal_phone,
//         domicile: req.body.domicile,
//         ktp_photo: req.body.ktp_photo
//     };

//     // try {
//         // Check if the email is already registered
//         const existingRestaurant = await RestaurantACC.findOne({ email: data.email });
//         const existingTempRestaurant = await TempRestaurantACC.findOne({ email: data.email });

//         if (existingRestaurant) {
//             return res.status(400).send('Restaurant with this email already exists.');
//         } else if (existingTempRestaurant) {
//             return res.status(400).send('Restaurant with this email already exists.');
//         } else if (data.password !== data.repeatPassword) {
//             return res.status(400).send('Passwords do not match.');
//         } else {
//             // Hash the password
//             const saltRounds = 10;
//             const hashedPassword = await bcrypt.hash(data.password, saltRounds);
//             data.password = hashedPassword;

//             // Create new restaurant account
//             const newTempRestaurantACC = new TempRestaurantACC(data);
//             await newTempRestaurantACC.save();

//             // const newRating = new Rating({
//             //     combined_rating: 4,
//             //     ambience_rating: 4,
//             //     taste_to_price_rating: 4,
//             //     service_rating: 4,
//             //     cleanliness_rating: 4
//             // });
//             // await newRating.save();

//             // // Create corresponding entry in Restaurant collection
//             // const newRestaurant = new Restaurant({
//             //     name: newRestaurantACC.restaurant_name,
//             //     culinary_type: '', // Default value, can be updated later
//             //     address: '',
//             //     link: '',
//             //     is_branch: false,
//             //     payment_methods: '',
//             //     price_range: '',
//             //     open_schedule: '',
//             //     available_facilities: '',
//             //     unavailable_facilities: '',
//             //     phone: '',
//             //     overall_rating: 0,
//             //     individual_rating: '',
//             //     rating_id: newRating._id, // Assuming a rating system to be implemented later
//             //     slot: 30 // Default slot
//             // });
//             // await newRestaurant.save();

//             // Redirect to login after successful signup
//             res.redirect('/restaurant-dashboard/login');
//         }
//     // } catch (error) {
//     //     res.status(500).send("Internal server error");
//     // }
// });

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

    try {
        const existingRestaurant = await RestaurantACC.findOne({ email: data.email });
        const existingTempRestaurant = await TempRestaurantACC.findOne({ email: data.email });

        if (existingRestaurant || existingTempRestaurant) {
            return res.status(400).send('Restaurant with this email already exists.');
        } else if (data.password !== data.repeatPassword) {
            return res.status(400).send('Passwords do not match.');
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;

            const newTempRestaurantACC = new TempRestaurantACC({
                ...data,
                status: "Pending" // Default status untuk akun baru
            });
            await newTempRestaurantACC.save();

            // Set session from registration
            req.session.restaurantRegister = {
                restaurant_name: data.restaurant_name,
                email: data.email,
                status: "Pending"
            };

            // Redirect to dashboard after successful signup
            res.status(200).json({ message: "Signup successful", status: "Pending" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal server error");
    }
});

// Endpoint untuk cek status akun restoran
router.get('/api/restaurant-dashboard/status', async (req, res) => {
    try {
        const email = req.session.restaurantLogin?.email || req.session.restaurantRegister?.email;
        if (!email) {
            return res.status(401).json({ status: 'Unauthorized', message: 'User not authenticated' });
        }
        
        const activeRestaurant = await RestaurantACC.findOne({ email });
        const tempRestaurant = await TempRestaurantACC.findOne({ email });
        const rejectedRestaurant = await TempRejectedRestaurant.findOne({ email });

        if (activeRestaurant) {
            return res.json({ status: 'Active' });
        } else if (tempRestaurant) {
            return res.json({ status: 'Pending' });
        } else if (rejectedRestaurant) {
            return res.json({
                status: 'Failed',
                data: {
                    email: rejectedRestaurant.email,
                    restaurant_name: rejectedRestaurant.restaurant_name,
                    phone_number: rejectedRestaurant.phone_number,
                    business_type: rejectedRestaurant.business_type,
                    company_name: rejectedRestaurant.company_name,
                    full_address: rejectedRestaurant.full_address,
                    npwp: rejectedRestaurant.npwp,
                    npwp_photo: rejectedRestaurant.npwp_photo,
                    full_name: rejectedRestaurant.full_name,
                    nik: rejectedRestaurant.nik,
                    gender: rejectedRestaurant.gender,
                    birth_date: rejectedRestaurant.birth_date,
                    personal_phone: rejectedRestaurant.personal_phone,
                    domicile: rejectedRestaurant.domicile,
                    ktp_photo: rejectedRestaurant.ktp_photo,
                    rejection_reason: rejectedRestaurant.rejection_reason,
                }
            });
        } else {
            return res.status(404).json({ status: 'Not Found', message: 'Account not found' });
        }
    } catch (error) {
        console.error('Error fetching account status:', error);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
});

// Endpoint untuk memperbarui data dan mengirimkan ke TempRestaurantACC
router.put('/api/restaurant-dashboard/update', async (req, res) => {
    try {
        const {
            email,
            password,
            businessName,
            phoneNumber,
            businessType,
            companyName,
            address,
            npwp,
            npwpPhoto,
            ownerName,
            nik,
            gender,
            birthDate,
            phoneNumberOwner,
            domicile,
            ktpPhoto
        } = req.body;

        // Periksa apakah data ada di TempRejectedRestaurant
        const rejectedData = await TempRejectedRestaurant.findOne({ email });
        if (!rejectedData) {
            return res.status(404).json({ message: 'Data not found in TempRejectedRestaurant.' });
        }

        // Perbarui data di TempRejectedRestaurant
        const updatedData = {
            email,
            password: password ? password : rejectedData.password, // Gunakan password baru jika diberikan
            restaurant_name: businessName,
            phone_number: phoneNumber,
            business_type: businessType,
            company_name: companyName || '',
            full_address: address,
            npwp,
            npwp_photo: npwpPhoto,
            full_name: ownerName,
            nik,
            gender,
            birth_date: birthDate,
            personal_phone: phoneNumberOwner,
            domicile,
            ktp_photo: ktpPhoto,
        };

        // Simpan data yang diperbarui di TempRestaurantACC
        const tempRestaurant = new TempRestaurantACC(updatedData);
        await tempRestaurant.save();

        // Hapus data dari TempRejectedRestaurant setelah dipindahkan
        await TempRejectedRestaurant.deleteOne({ email });

        return res.status(200).json({
            message: 'Data successfully moved to TempRestaurantACC.',
            data: updatedData
        });
    } catch (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});

module.exports = router;
