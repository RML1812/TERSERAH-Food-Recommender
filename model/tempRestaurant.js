const mongoose=require("mongoose")
const tempRestaurantSchema = new mongoose.Schema({
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
    overall_rating: { type: Number, default: 4 },
    individual_rating: String,
    rating_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    slot: { type: Number, default: 30 },
    is_live: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const TempRestaurant = mongoose.model('TempRestaurant', tempRestaurantSchema);


module.exports={
    TempRestaurant,
}
