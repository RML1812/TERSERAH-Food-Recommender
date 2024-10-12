const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://hamudi:DFHjOlbRAM9bvAKR@cluster0.45rn36l.mongodb.net/TerserahDB")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


