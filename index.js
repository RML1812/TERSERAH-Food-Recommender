const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const path = require("path")
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express()
const brain = require('brain.js');
const tf = require('@tensorflow/tfjs');
require("./mongo")


const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const reviewRoutes = require('./routes/review');
const homeRoutes = require('./routes/home');
const profileRoutes = require('./routes/profile');
const reservationRoutes = require('./routes/reservation');
const restaurantRoutes = require('./routes/restaurant');
const terserahinRoutes = require('./routes/terserahin');
const wishlistRoutes = require('./routes/wishlist');

const port = process.env.PORT || 3000
app.use(express.json())
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }))
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
console.log(publicPath);

const midtransClient = require('midtrans-client');

//view engine menggunakan ejs
app.set('view engine', 'ejs')

//session
app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false
}));

// migrateRatings().then(updateRestaurantReferences);

app.use(homeRoutes);
app.use(loginRoutes);
app.use(profileRoutes);
app.use(reservationRoutes);
app.use(restaurantRoutes);
app.use(reviewRoutes);
app.use(signupRoutes);
app.use(terserahinRoutes);
app.use(wishlistRoutes);


app.listen(port, () => {
    console.log('port connected');
})

