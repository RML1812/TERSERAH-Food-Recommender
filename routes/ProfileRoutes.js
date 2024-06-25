const express = require('express');
const router = express.Router();

// Mengambil profile user
router.get('/user/:id', async (req, res) => {
    const userLogin = req.session.userLogin;

    if (!userLogin) {
        return res.redirect('/login');
    }

    if (userLogin._id.toString() === "1") {
        // Jika ID pengguna adalah "1", redirect ke halaman utama
        return res.redirect('/login');
    }

    try {
        res.status(200).json({
            message: "Profile Page",
            title: 'Profile',
            userLogin
        });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

module.exports = router;
