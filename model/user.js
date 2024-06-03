const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    jenisKelamin: { type: String, required: true },
    tanggalLahir: { type: String, required: true },
    noHP: { type: String, required: true },
    domisili: { type: String, required: true },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});

const User=new mongoose.model('User',userSchema)

module.exports=User