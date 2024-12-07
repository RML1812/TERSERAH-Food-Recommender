const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require("../model/admin")
const User = require("../model/user")
const {Restaurant} = require("../model/restaurant")
const { RestaurantACC } = require("../model/restaurantACC");
const { TempRestaurantACC } = require("../model/tempRestaurantACC");
const { TempRejectedRestaurant } = require("../model/tempRejectedRestaurant");
const {Rating} = require("../model/rating")
const router = express.Router();

// Main Admin Dashboard
router.get('/admin-dashboard', async (req, res) => {
    try {
        if (!req.session.adminLogin) {
            return res.status(401).redirect('/admin-dashboard/login');
        }

        // Get total counts
        const totalUsers = await User.countDocuments();
        const totalRestaurants = await Restaurant.countDocuments();
        // const totalVisits = await Visit.countDocuments(); // Assuming visits are tracked
        const pendingRestaurants = await TempRestaurantACC.countDocuments();
        const rejectedRestaurants = await TempRejectedRestaurant.countDocuments();
        // Send data to the admin dashboard
        res.status(200).json({
            title: "Admin Dashboard",
            totalUsers,
            totalRestaurants,
            // totalVisits,
            pendingRestaurantsCount: pendingRestaurants,
            rejectedRestaurantsCount: rejectedRestaurants
        });
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

router.get('/admin-dashboard/review-restaurant', async (req, res) => {
    try {
        if (!req.session || !req.session.adminLogin) {
            return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
        }

        // Get all pending restaurant accounts
        const { tab } = req.query; // Dapatkan tab dari query parameter

        let accounts;
        if (tab === 'Pending') {
            accounts = await TempRestaurantACC.find(); // Ambil data pending
        } else if (tab === 'Rejected') {
            accounts = await TempRejectedRestaurant.find(); // Ambil data rejected
        } else {
            return res.status(400).json({ error: 'Invalid tab specified' });
        }

        res.status(200).json({
            message: `${tab} restaurants retrieved successfully`,
            accounts,
        });
    } catch (error) {
        console.error('Error in /admin-dashboard/review-restaurant:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// // Approve or reject a restaurant account (POST)
// router.post('/admin-dashboard/review-restaurant/:id_restaurant', async (req, res) => {
//     try {
//         if (!req.session.adminLogin) {
//             return res.status(401).redirect('/admin-dashboard/login');
//         }

//         const restaurantId = req.params.id_restaurant;
//         const { action } = req.body; // Action could be 'approve' or 'reject'

//         const restaurantACC = await TempRestaurantACC.findById(restaurantId);

//         if (!restaurantACC) {
//             return res.status(404).send("Restaurant account not found");
//         }

//         if (action === "approve") {
//             // Create new rating for the approved restaurant

//             const newRating = new Rating({
//                 combined_rating: 4,
//                 ambience_rating: 4,
//                 taste_to_price_rating: 4,
//                 service_rating: 4,
//                 cleanliness_rating: 4
//             });
//             await newRating.save();

//             // Create corresponding entry in Restaurant collection
            
//             const newRestaurant = new Restaurant({
//                 name: restaurantACC.restaurant_name,
//                 culinary_type: restaurantACC.culinary_type || '', // Assuming culinary type is provided
//                 address: restaurantACC.address || '',
//                 link: restaurantACC.link || '',
//                 is_branch: restaurantACC.is_branch || false,
//                 payment_methods: restaurantACC.payment_methods || '',
//                 price_range: restaurantACC.price_range || '',
//                 open_schedule: restaurantACC.open_schedule || '',
//                 available_facilities: restaurantACC.available_facilities || '',
//                 unavailable_facilities: restaurantACC.unavailable_facilities || '',
//                 phone: restaurantACC.phone || '',
//                 overall_rating: 0,  // Initial rating, can be updated later
//                 individual_rating: '',  // Placeholder for future rating system
//                 rating_id: newRating._id,  // Link to rating document
//                 slot: 30  // Default slot
//             });

//             await newRestaurant.save();

//             const newRestaurantACC = new RestaurantACC({
//                 email: restaurantACC.email,
//                 password: restaurantACC.password,
//                 restaurant_name: restaurantACC.restaurant_name,
//                 phone_number: restaurantACC.phone_number,
//                 business_type: restaurantACC.business_type,
//                 company_name: restaurantACC.company_name,
//                 full_address: restaurantACC.full_address,
//                 npwp: restaurantACC.npwp,
//                 npwp_photo: restaurantACC.npwp_photo,
//                 full_name: restaurantACC.full_name,
//                 nik: restaurantACC.nik,
//                 gender: restaurantACC.gender,
//                 birth_date: restaurantACC.birth_date,
//                 personal_phone: restaurantACC.personal_phone,
//                 domicile: restaurantACC.domicile,
//                 ktp_photo: restaurantACC.ktp_photo
//                 // tambahkan field lain yang dibutuhkan untuk RestaurantACC
//             });
            
//             await newRestaurantACC.save();

//             // Remove from tempRestaurantACC after successful approval
//             await TempRestaurantACC.findByIdAndDelete(restaurantACC._id);

//             return res.status(200).send("Restaurant account approved and added to RestaurantACC");
//         }
//     } catch (error) {
//         return res.status(500).send("Internal server error");
//     }
// });

// Approve or reject a restaurant account (POST)
router.post('/admin-dashboard/review-restaurant/:id_restaurant', async (req, res) => {
    try {
        if (!req.session.adminLogin) {
            return res.status(401).redirect('/admin-dashboard/login');
        }

        const restaurantId = req.params.id_restaurant;
        const { action, reason } = req.body; // Include rejection reason in the body

        const restaurantACC = await TempRestaurantACC.findById(restaurantId);

        if (!restaurantACC) {
            return res.status(404).send("Restaurant account not found");
        }

        if (action === "approve") {
            // Approval logic
            const newRating = new Rating({
                combined_rating: 4,
                ambience_rating: 4,
                taste_to_price_rating: 4,
                service_rating: 4,
                cleanliness_rating: 4
            });
            await newRating.save();

            const newRestaurant = new Restaurant({
                name: restaurantACC.restaurant_name,
                culinary_type: restaurantACC.culinary_type || '',
                address: restaurantACC.address || '',
                link: restaurantACC.link || '',
                is_branch: restaurantACC.is_branch || false,
                payment_methods: restaurantACC.payment_methods || '',
                price_range: restaurantACC.price_range || '',
                open_schedule: restaurantACC.open_schedule || '',
                available_facilities: restaurantACC.available_facilities || '',
                unavailable_facilities: restaurantACC.unavailable_facilities || '',
                phone: restaurantACC.phone || '',
                overall_rating: 0,
                individual_rating: '',
                rating_id: newRating._id,
                slot: 30
            });

            await newRestaurant.save();

            const newRestaurantACC = new RestaurantACC({
                email: restaurantACC.email,
                password: restaurantACC.password,
                restaurant_name: restaurantACC.restaurant_name,
                phone_number: restaurantACC.phone_number,
                business_type: restaurantACC.business_type,
                company_name: restaurantACC.company_name,
                full_address: restaurantACC.full_address,
                npwp: restaurantACC.npwp,
                npwp_photo: restaurantACC.npwp_photo,
                full_name: restaurantACC.full_name,
                nik: restaurantACC.nik,
                gender: restaurantACC.gender,
                birth_date: restaurantACC.birth_date,
                personal_phone: restaurantACC.personal_phone,
                domicile: restaurantACC.domicile,
                ktp_photo: restaurantACC.ktp_photo
            });

            await newRestaurantACC.save();
            await TempRestaurantACC.findByIdAndDelete(restaurantACC._id);

            return res.status(200).send("Restaurant account approved and added to RestaurantACC");
        } else if (action === "reject") {
            // Rejection logic
            if (!reason) {
                return res.status(400).send("Rejection reason is required");
            }

            // Add rejected account to TempRejectedRestaurant
            const rejectedRestaurant = new TempRejectedRestaurant({
                email: restaurantACC.email,
                password: restaurantACC.password,
                restaurant_name: restaurantACC.restaurant_name,
                phone_number: restaurantACC.phone_number,
                business_type: restaurantACC.business_type,
                company_name: restaurantACC.company_name,
                full_address: restaurantACC.full_address,
                npwp: restaurantACC.npwp,
                npwp_photo: restaurantACC.npwp_photo,
                full_name: restaurantACC.full_name,
                nik: restaurantACC.nik,
                gender: restaurantACC.gender,
                birth_date: restaurantACC.birth_date,
                personal_phone: restaurantACC.personal_phone,
                domicile: restaurantACC.domicile,
                ktp_photo: restaurantACC.ktp_photo,
                rejection_reason: reason,
                rejected_at: new Date()
            });

            await rejectedRestaurant.save();

            // Remove the account from TempRestaurantACC
            await TempRestaurantACC.findByIdAndDelete(restaurantACC._id);

            return res.status(200).send("Restaurant account rejected and logged successfully");
        } else {
            return res.status(400).send("Invalid action");
        }
    } catch (error) {
        console.error("Error processing restaurant account:", error);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;