const mongoose = require('mongoose');

const restaurantACCSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    restaurant_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    business_type: { type: String, required: true },
    company_name: { type: String, default: null },
    full_address: { type: String, required: true },
    npwp: { type: String, required: true },
    npwp_photo: { type: String, required: true }, // assuming the photo is stored as a URL or file path
    full_name: { type: String, required: true },
    nik: { type: String, required: true }, // NIK is an ID number
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    birth_date: { type: Date, required: true },
    personal_phone: { type: String, required: true },
    domicile: { type: String, required: true },
    ktp_photo: { type: String, required: true } // assuming the photo is stored as a URL or file path
});

const RestaurantACC = mongoose.model('RestaurantACC', restaurantACCSchema);

module.exports = {
    RestaurantACC
};
