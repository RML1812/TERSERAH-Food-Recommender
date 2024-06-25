const mongoose=require("mongoose")
const menuSchema = new mongoose.Schema({
    link: String,
    gallery_link: String,
    menu_link: String,
});


const Menu = mongoose.model('Menu', menuSchema);

module.exports={
    Menu
}