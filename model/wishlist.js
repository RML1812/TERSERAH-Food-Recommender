const mongoose=require("mongoose")
const wishlistSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    restaurant_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});

const Wishlist=new mongoose.model('Wishlist',wishlistSchema)

module.exports=Wishlist