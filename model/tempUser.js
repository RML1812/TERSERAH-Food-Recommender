const mongoose=require("mongoose")
const tempUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    jenisKelamin: { type: String, required: true },
    tanggalLahir: { type: String, required: true },
    noHP: { type: String, required: true },
    domisili: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, required: true },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
}, { timestamps: true });

const TempUser=new mongoose.model('tempUser',tempUserSchema)

module.exports=TempUser