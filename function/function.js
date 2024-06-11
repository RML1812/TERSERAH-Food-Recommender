const {Restaurant,
    CulinaryTypeView,
    PaymentMethodView,
    AvailableFacilityView,
    PriceRangeView} = require("../model/restaurant")
const {Rating} = require("../model/rating")
const midtransClient = require('midtrans-client');
const express = require('express');

async function migrateRatings() {
    try {
        const restaurants = await Restaurant.find();

        for (const restaurant of restaurants) {
            const individualRatings = restaurant.individual_rating.split(',').map(parseFloat);

            // Asumsi bahwa urutan rating adalah sesuai dengan skema baru
            const rating = new Rating({
                restaurant_id: restaurant._id,
                combined_rating: restaurant.overall_rating,
                ambience_rating: individualRatings[0],
                taste_to_price_rating: individualRatings[1],
                service_rating: individualRatings[2],
                cleanliness_rating: individualRatings[3]
            });
            restaurant.rating_id = rating._id;
            await restaurant.save();

            await rating.save();
        }

        console.log('Ratings migration completed');
    } catch (error) {
        console.error('Error migrating ratings', error);
    } 
}

async function updateRestaurantReferences() {
    try {
        const restaurants = await Restaurant.find();

        for (const restaurant of restaurants) {
            if (restaurant.rating_id) {
                await Restaurant.findByIdAndUpdate(restaurant._id, {
                    $unset: { individual_rating: "" } // Remove the individual_rating field
                });
            }
        }

        console.log('Updated restaurant references and removed individual_rating');
    } catch (error) {
        console.error('Error updating restaurant references', error);
    }
}

// Create Snap API instance
let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
isProduction : false,
serverKey : 'SB-Mid-server--fNgfFtFVee5pZFvJljO0e_m'
});

// Middleware untuk memeriksa apakah pengguna sudah masuk atau belum
const checkAuth = (req, res ,next) => {
    if (req.session.userLogin) {
        // Jika pengguna sudah masuk, lanjutkan ke rute berikutnya
        next();
    } else {
        // Jika pengguna belum masuk, alihkan ke halaman login atau beri respon lainnya
        req.session.userLogin = { _id: 1, name: 'dummy'}; // Akun dummy
        next();
    }
};
module.exports={
    migrateRatings,
    updateRestaurantReferences,
    checkAuth,
    snap
}
