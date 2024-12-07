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
        return res.status(404).send("Admin email is not found");
      }
  
      const passwordMatch = await bcrypt.compare(req.body.password, admin.password);
  
      if (!passwordMatch) {
        return res.status(401).send("Incorrect password");
      }
  
      // Store the logged-in user info in the session
      req.session.adminLogin = {
        email: admin.email,
        name: admin.name, // Include the user's name
      };
  
      // Send back the user's details
      res.status(200).send({
        message: "Login successful",
        user: {
          name: admin.name,
          email: admin.email,
          jenisKelamin: admin.jenisKelamin,
          tanggalLahir: admin.tanggalLahir,
          noHP: admin.noHP,
          domisili: admin.domisili,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
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
