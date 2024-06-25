const mongoose=require("mongoose")
const transactionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
    transactionToken:{ type: String, required: true },
    status: { type: String, required: true, default: 'Pending' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports={
    Transaction
}
