const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const path = require("path")
const session = require('express-session');
// const bcrypt = require('bcrypt');
const app = express()

//apa saja yang diuse
app.use(express.json())
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }))

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
console.log(publicPath);


//view engine menggunakan ejs
app.set('view engine', 'ejs')

//session
app.use(session({
    secret: 'secret-key', // Ganti dengan kunci rahasia yang lebih aman
    resave: false,
    saveUninitialized: false
}));

//port yang digunakan
const port = process.env.PORT || 3000