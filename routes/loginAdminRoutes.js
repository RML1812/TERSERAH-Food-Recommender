const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require("../model/admin")
const router = express.Router();

// Render login page
router.get('/admin-dashboard/login', (req, res) => {
    const adminLogin = req.session.adminLogin;

    if (adminLogin && adminLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${adminLogin.name}` });
    }

    res.status(200).json({
        title: "Login Admin",
    });
});

// Handle login
router.post('/admin-dashboard/login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            res.send("Admin email is not found");
            return;
        }

        const passwordMatch = await bcrypt.compare(req.body.password, admin.password);

        if (passwordMatch) {
            req.session.adminLogin = admin;
            res.redirect('/admin-dashboard');
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// Handle logout
router.get('/admin-dashboard/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
