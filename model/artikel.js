const mongoose = require('mongoose');

const artikelSchema = new mongoose.Schema({
    No: Number,
    Judul: String,
    Penulis: String,
    Tanggal: String,
    Gambar: String,
    Berita: String
});

module.exports = mongoose.model('Artikel', artikelSchema);
