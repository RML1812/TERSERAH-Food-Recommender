const mongoose=require("mongoose")
const user=new mongoose.Schema({
    name:{ type:String, required:true},
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    jenisKelamin:{
        type:String,
        required:true
    },
    tanggalLahir:{
        type:String,
        required:true
    },
    noHP:{
        type:String,
        required:true
    },
    domisili:{
        type:String,
        required:true
    }
})

const User=new mongoose.model('User',user)

module.exports=User