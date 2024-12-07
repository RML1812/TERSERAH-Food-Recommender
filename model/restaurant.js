const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    culinary_type: String,
    address: String,
    link: String,
    is_branch: Boolean,
    payment_methods: String,
    price_range: String,
    open_schedule: String,
    available_facilities: String,
    unavailable_facilities: String,
    phone: String,
    overall_rating: Number,
    individual_rating: String,
    rating_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    slot: { type: Number, default: 30 },
    is_live: { type: Boolean, default: false },
    imagesGaleri: [{
        description: String,
        img: {
            data: Buffer,
            contentType: String
        }
    }],
    imagesMenu: [{ 
        description: String,
        img: {
            data: Buffer,
            contentType: String
        }
    }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const CulinaryTypeView = mongoose.model('CulinaryTypeView', new mongoose.Schema({}, { collection: 'culinary_type_variation', strict: false }));
const PaymentMethodView = mongoose.model('PaymentMethodView', new mongoose.Schema({}, { collection: 'payment_methods_variation', strict: false }));
const AvailableFacilityView = mongoose.model('AvailableFacilityView', new mongoose.Schema({}, { collection: 'available_facilities_variation', strict: false }));
const PriceRangeView = mongoose.model('PriceRangeView', new mongoose.Schema({}, { collection: 'price_range', strict: false }));

module.exports = {
    Restaurant,
    CulinaryTypeView,
    PaymentMethodView,
    AvailableFacilityView,
    PriceRangeView,
};