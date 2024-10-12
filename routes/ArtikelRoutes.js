const express = require('express');
const router = express.Router();
const Artikel = require('../model/artikel');
const mongoose = require('mongoose');

// Get all articles
router.get('/artikel', async (req, res) => {
    try {
        const artikels = await Artikel.find();
        res.json(artikels);
    } catch (err) {
        
        res.status(500).json({ message: err.message });
    }
});

// Get a single article by ID
router.get('/artikel/:artikelId', async (req, res) => {
    const { artikelId } = req.params;
    console.log(`Received artikelId: ${artikelId}`);
    try {
        // Validate and convert artikelId to ObjectId
        if (!mongoose.Types.ObjectId.isValid(artikelId)) {
            return res.status(400).json({ message: 'Invalid article ID format' });
        }

        // Convert artikelId to ObjectId using 'new'
        const objectId = new mongoose.Types.ObjectId(artikelId);
        console.log(`Converted ObjectId: ${objectId}`);

        // Debug: Ensure the query is correct
        const artikel = await Artikel.findOne({ _id: objectId });
        if (!artikel) {
            console.log(`No article found with ID: ${artikelId}`);
            return res.status(404).json({ message: 'Cannot find article' });
        }
        res.json(artikel);
    } catch (err) {
        console.log(`Error while searching for article: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
