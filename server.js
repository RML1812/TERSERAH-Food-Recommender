const express = require('express');
const http = require('http');
const path = require("path")
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express()
const brain = require('brain.js');
const cors = require('cors');

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://hamudi:DFHjOlbRAM9bvAKR@cluster0.45rn36l.mongodb.net/TerserahDB")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const loginRoutes = require('./routes/LoginRoutes');
const signupRoutes = require('./routes/SignupRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const homeRoutes = require('./routes/HomeRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const reservationRoutes = require('./routes/ReservationRoutes');
const restaurantRoutes = require('./routes/RestaurantRoutes');
const terserahinRoutes = require('./routes/TerserahinRoutes');
const wishlistRoutes = require('./routes/WishlistRoutes');
const artikelRoutes = require('./routes/ArtikelRoutes')
const loginRestaurantRoutes = require('./routes/loginRestaurantRoutes');
const signupRestaurantRoutes = require('./routes/SignupRestaurantRoutes');
const loginAdminRoutes = require('./routes/LoginAdminRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const restaurantDashboardRoutes = require('./routes/restaurantDashboardRoutes')
const imageRoutes = require('./routes/uploadImageRoutes');


const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
console.log(publicPath);

// const midtransClient = require('midtrans-client');

// Enable CORS with credentials
app.use(cors({
    origin: 'http://localhost:5173', // Ganti dengan URL frontend Anda
    credentials: true
}));

const MongoStore = require('connect-mongo');

//session
app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/your-database' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
    }
}));


// migrateRatings().then(updateRestaurantReferences);

app.use(homeRoutes);
app.use(loginRoutes);
app.use(signupRoutes);
app.use(profileRoutes);
app.use(reservationRoutes);
app.use(restaurantRoutes);
app.use(reviewRoutes);
app.use(terserahinRoutes);
app.use(wishlistRoutes);
app.use(artikelRoutes);
app.use(loginRestaurantRoutes);
app.use(signupRestaurantRoutes);
app.use(loginAdminRoutes);
app.use(restaurantDashboardRoutes );
app.use(adminDashboardRoutes);
app.use(imageRoutes);
// Serve Vue app
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log('port connected');
})

