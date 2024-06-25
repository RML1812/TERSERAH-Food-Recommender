const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../model/user")
const router = express.Router();

// Render login page
router.get('/login', (req, res) => {
    const userLogin = req.session.userLogin;

    if (userLogin && userLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${userLogin.name}` });
    }

    res.render('login', {
        layout: "./layouts/main_layouts",
        title: "Login",
    });
});

// Handle login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });

        if (!user) {
            res.send("User name not found");
            return;
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            req.session.userLogin = user;
            res.redirect('/');
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
