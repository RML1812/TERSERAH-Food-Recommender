require('dotenv').config();
const express = require('express');
const User = require("../model/user");
const TempUser = require("../model/tempUser");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cron = require('node-cron');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password : profile.displayName,
                jenisKelamin: profile.gender || profile.gender_identity || 'Laki-laki', // Default to "Laki-laki"
                tanggalLahir: profile.birthday || 'YYYY-MM-DD', // Default to "YYYY-MM-DD"
                noHP: profile.phone_number || (profile.phones && profile.phones[0]) || '081234567891', // Empty string if not found
                domisili: profile.location || "unknown"
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Render signup page (with Google login button)
router.get('/signup', (req, res) => {
    const userLogin = req.session.userLogin;
  
    if (userLogin && userLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${userLogin.name}` });
    }
  
    res.render('signup', {
        layout: "./layouts/main_layouts",
        title: "Sign Up",
        googleLoginUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/google/callback&scope=profile email&response_type=code`
    });
});

// Handle signup
router.post('/signup', async (req, res) => {
    const { name, password, repeatPassword, email, jenisKelamin, tanggalLahir, noHP, domisili } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.send('User already exists. Please choose a different email.');
        return;
    } else if (password !== repeatPassword) {
        res.send('Password tidak sama');
        return;
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const token = crypto.randomBytes(32).toString('hex');

        const newTempUser = new TempUser({
            name,
            password: hashedPassword,
            email,
            jenisKelamin,
            tanggalLahir,
            noHP,
            domisili,
            confirmationToken: token,
            isConfirmed: false
        });

        await newTempUser.save();

        const confirmationUrl = `http://${req.headers.host}/confirm/${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Please confirm your email address',
            text: `Click the link to confirm your email: ${confirmationUrl}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.send('Please check your email to confirm your account. Confirm in less than 10 minutes!');
    }
});

// Handle email confirmation
router.get('/confirm/:token', async (req, res) => {
    const tempUser = await TempUser.findOne({ confirmationToken: req.params.token });
    if (!tempUser) {
        res.send('Invalid token');
        return;
    }
    const newUser = new User({
        name: tempUser.name,
        password: tempUser.password,
        email: tempUser.email,
        jenisKelamin: tempUser.jenisKelamin,
        tanggalLahir: tempUser.tanggalLahir,
        noHP: tempUser.noHP,
        domisili: tempUser.domisili,
        confirmationToken : tempUser.confirmationToken,
        isConfirmed: true
    });

    await newUser.save();
    await TempUser.deleteOne({ _id: tempUser._id });
    res.redirect('/login');
});

cron.schedule('*/10 * * * *', async () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    try {
        await TempUser.deleteMany({ isConfirmed: false, createdAt: { $lt: tenMinutesAgo } });
        console.log('Unconfirmed users older than 10 minutes have been deleted');
    } catch (err) {
        console.error('Error deleting unconfirmed users: ', err);
    }
});

router.get('/auth/google',
    passport.authenticate('google', { scope: [  "https://www.googleapis.com/auth/user.gender.read", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.addresses.read", "profile", "email" ] })
);

// Route to handle the callback from Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;
