const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../model/user")
const router = express.Router();

router.get('/login', (req, res) => {
    const userLogin = req.session.userLogin;
  
    if (userLogin) {
      if (userLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${userLogin.name}`, user: userLogin });
      } else {
        req.session.userLogin = null;
        return res.status(200).json({ message: "Anda telah Keluar" });
      }
    }
  
    res.status(200).json({ message: "Akun belum masuk, Silakan login" });
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
            req.session.userId = user._id; // Simpan userId dalam session
            console.log("Status:", user.name);
            res.status(200).json(user); // Send user data to frontend
            // res.redirect('/'); // Arahkan ke halaman utama
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

// Handle user update
router.post('/update', async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).send("Unauthorized: No user logged in");
        }

        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            noHP: req.body.noHP,
            jenisKelamin: req.body.jenisKelamin,
            tanggalLahir: req.body.tanggalLahir,
            domisili: req.body.domisili
        };

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(404).send("User not found");
        }

        req.session.userLogin = user; // Update session data
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
