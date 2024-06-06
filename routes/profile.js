const express = require('express');
const router = express.Router();

//mengambil profile user
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
        res.render('profile', {
            layout : "./layouts/main_layouts",
            title : 'Profile',
            userLogin
        })
        
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" }).redirect('/');
    }
});


module.exports = router;