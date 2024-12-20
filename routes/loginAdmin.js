const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require("../model/admin")
const router = express.Router();

// Hash password
// bcrypt.genSalt(10, (err, salt) => {
//     if (err) throw err;
    
//     bcrypt.hash("admin12345", salt, (err, hash) => {
//       if (err) throw err;
  
//       // Data admin dengan password yang sudah di-hash
//       const adminData = {
//         name: "admin12345",
//         password: hash, // gunakan password yang sudah di-hash
//         email: "admin12345@gmail.com",
//         jenisKelamin: "Laki-laki",
//         tanggalLahir: "1992-05-10",
//         noHP: "081234567891",
//         domisili: "Dxtrie"
//       };
  
//       // Simpan data admin ke database
//       Admin.create(adminData)
//         .then(() => console.log('Admin created successfully with hashed password'))
//         .catch((err) => console.error('Error creating admin:', err));
//     });
//   });

// Render login page
router.get('/admin-dashboard/login', (req, res) => {
    const adminLogin = req.session.adminLogin;

    if (adminLogin && adminLogin._id != "1") {
        return res.status(200).json({ message: `Anda telah login ${adminLogin.name}` });
    }

    res.render('loginAdmin', {
        layout: "./layouts/main_layouts",
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
