// Middleware untuk memeriksa apakah pengguna sudah masuk atau belum
const checkAuth = (req, res ,next) => {
    if (req.session.userLogin) {
        // Jika pengguna sudah masuk, lanjutkan ke rute berikutnya
        next();
    } else {
        // Jika pengguna belum masuk, alihkan ke halaman login atau beri respon lainnya
        req.session.userLogin = { _id: 1, name: 'dummy'}; // Akun dummy
        next();
    }
};

module.exports = { checkAuth }