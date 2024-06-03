const mongoose = require('mongoose');

// Reservasi Schema
const reservationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    tanggalReservation: { type: String, required: true },
    name : { type: String, required: true },
    jumlahOrang: { type: Number, required: true },
    noHP: { type: String, required: true },
    totalHarga: { type: Number, required: true },
    waktuMulai: { type: String, required: true }, 
    waktuSelesai: { type: String, required: true } 
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports={
    Reservation
}