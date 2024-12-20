const express = require('express');
const multer = require('multer');
const { Restaurant } = require("../model/restaurant");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/restaurant/upload-image/galeri/:id', upload.array('files', 10), async (req, res) => {
    console.log(req.body);  // Cek isi body
    console.log(req.files); // Cek apakah files terdefinisi
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded.");
    }

    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        req.files.forEach(file => {
            restaurant.imagesGaleri.push({
                description: req.body.description, // Jika deskripsi berbeda untuk setiap file, bisa diubah menjadi array
                img: {
                    data: file.buffer,
                    contentType: file.mimetype
                }
            });
        });

        await restaurant.save();
        res.send('Images added successfully to gallery');
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.post('/restaurant/upload-image/menu/:id', upload.array('files', 10), async (req, res) => {
    console.log(req.body);  // Cek isi body
    console.log(req.files); // Cek apakah files terdefinisi
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded.");
    }

    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        req.files.forEach(file => {
            restaurant.imagesMenu.push({
                description: req.body.description, // Jika deskripsi berbeda untuk setiap file, bisa diubah menjadi array
                img: {
                    data: file.buffer,
                    contentType: file.mimetype
                }
            });
        });

        await restaurant.save();
        res.send('Menu images added successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// Route untuk mendapatkan data galeri dari sebuah restaurant
router.get('/restaurant/image/galeri/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        const imagesGaleriBase64 = restaurant.imagesGaleri.map(image => {
            let imgBase64 = `data:${image.img.contentType};base64,${image.img.data.toString('base64')}`;
            return { ...image._doc, imgBase64 }; // Spread operator digunakan jika Anda ingin menambahkan properti lain dari objek image
        });

        res.status(200).send(imagesGaleriBase64);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.get('/restaurant/image/menu/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        const imagesMenuBase64 = restaurant.imagesMenu.map(image => {
            let imgBase64 = `data:${image.img.contentType};base64,${image.img.data.toString('base64')}`;
            return { ...image._doc, imgBase64 }; // Spread operator digunakan jika Anda ingin menambahkan properti lain dari objek image
        });

        res.status(200).send(imagesMenuBase64);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


module.exports = router;
