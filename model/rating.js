const mongoose=require("mongoose")
const ratingSchema = new mongoose.Schema({
    combined_rating: Number,
    ambience_rating: Number,
    taste_to_price_rating: Number,
    service_rating: Number,
    cleanliness_rating: Number
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports={
    Rating
}
