const mongoose=require("mongoose")
const reviewSchema = new mongoose.Schema({
    rating_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    review: String,
    review_date: String,
    title: String
});

const Review = mongoose.model('Review', reviewSchema);

module.exports={
    Review
}