const express = require('express');
const User = require("../model/user")
const router = express.Router();

// Render signup page
router.get('/signup', (req, res) => {
    const userLogin = req.session.userLogin;

    if (userLogin) {
        if (userLogin._id == "1") {
            res.render('signup', {
                layout: "./layouts/main_layouts",
                title: "Sign Up",
            });
            return;
        } else {
            return res.status(200).json({ message: `Anda telah login ${userLogin.name}` });
        }
    }

    res.render('signup', {
        layout: "./layouts/main_layouts",
        title: "Sign Up",
    });
});

// Handle signup
router.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
        email: req.body.email,
        jenisKelamin: req.body.jenisKelamin,
        tanggalLahir: req.body.tanggalLahir,
        noHP: req.body.noHP,
        domisili: req.body.domisili,
    };

    const existingUser = await User.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
        return;
    } else if (data.password != data.repeatPassword) {
        res.send('Password tidak sama');
        return;
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        await User.insertMany(data);
        res.redirect('/login');
    }
});

module.exports = router;
