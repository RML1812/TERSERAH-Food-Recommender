const mongoose=require("mongoose")
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
    rating_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating', required: true },
    slot: { type: Number, default: 30 }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const CulinaryTypeView = mongoose.model('CulinaryTypeView', new mongoose.Schema({}, { collection: 'vulinary_type variation', strict: false }));
const PaymentMethodView = mongoose.model('PaymentMethodView', new mongoose.Schema({}, { collection: 'payment_methods variation', strict: false }));
const AvailableFacilityView = mongoose.model('AvailableFacilityView', new mongoose.Schema({}, { collection: 'available_facilities variation', strict: false }));
const PriceRangeView = mongoose.model('PriceRangeView', new mongoose.Schema({}, { collection: 'price_range', strict: false }));

module.exports={
    Restaurant,
    CulinaryTypeView,
    PaymentMethodView,
    AvailableFacilityView,
    PriceRangeView,
    // updateRestaurantReferences
}
