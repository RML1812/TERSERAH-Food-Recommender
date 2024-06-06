const express = require('express');
const {Transaction} = require("../model/transaction.js")
const {Reservation} = require("../model/reservation.js")
const {migrateRatings, updateRestaurantReferences, checkAuth, snap} = require("../function/function")
const router = express.Router();

router.post('/reservation/:restaurantId', async (req, res) => {
    const userLogin = req.session.userLogin; // Make sure user is logged in
    const { restaurantId } = req.params;
    const { tanggalReservation, name, jumlahOrang, noHP, waktuMulai, waktuSelesai } = req.body;

    const startTime = new Date(tanggalReservation + 'T' + waktuMulai);
    const endTime = new Date(tanggalReservation + 'T' + waktuSelesai);

    // Calculate the duration in hours
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);

    // Calculate the total price
    const pricePerPerson = 5000;
    const pricePerHour = 10000;
    const totalHarga = jumlahOrang * pricePerPerson + durationHours * pricePerHour;

    try {
        // Create and save the new reservation
        const newReservation = new Reservation({
            user_id: userLogin._id,
            restaurant_id: restaurantId,
            tanggalReservation,
            name,
            jumlahOrang,
            noHP,
            totalHarga,
            waktuMulai,
            waktuSelesai
        });

        await newReservation.save();

        // Create and save the new transaction

        // Pass the reservation and transaction data to the view
        res.render('detailtransaction', {
            layout: "./layouts/main_layouts",
            title: 'Detail Transaction',
            newReservation,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// Server-side Express.js route to generate and return a transaction token
router.get('/get-transaction-token', async (req, res) => {
    const userLogin = req.session.userLogin; // Make sure user is logged in
    const { reservation_id } = req.query; // Assuming reservation_id is passed as query parameter
    // const newReservation = req.body.newReservation;

    try {
        const newReservation = await Reservation.findById(reservation_id);
        // await newReservation.save();
        const parameter = {
            "transaction_details": {
                "order_id": newReservation._id.toString(), // Ensure order_id is a string
                "gross_amount": newReservation.totalHarga
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": newReservation.name,
                "phone": newReservation.noHP
            }
        };

        const transactionTokenResponse = await snap.createTransaction(parameter);
        if (transactionTokenResponse.token) {
            const newTransaction = new Transaction({
                user_id: userLogin._id,
                restaurant_id: newReservation.restaurant_id,
                reservation_id: newReservation._id,
                transactionToken: transactionTokenResponse.token,
                status: 'In Progress'
            });

            await newTransaction.save();
            res.json({ transactionToken: transactionTokenResponse.token });
        } else {
            res.status(500).json({ error: 'Failed to create transaction token.' });
        }
    } catch (error) {
        console.error('Error generating transaction token:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Endpoint untuk menangani redirect setelah pembayaran
router.get('/payment/finish', async (req, res) => {
    const { reservation_id } = req.query; // Dapatkan order_id dari query parameter

    try {
        // Temukan transaksi berdasarkan order_id
        const transaction = await Transaction.findOne({ 'reservation_id': reservation_id });

        if (transaction) {
            // Update status transaksi menjadi 'Success'
            transaction.status = 'Success';
            await transaction.save();

            // Redirect ke halaman utama
            res.redirect('/');
        } else {
            res.status(404).send('Transaction not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


// POST endpoint to delete a reservation
router.post('/delete-reservation', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.body.id_reservation);
        if (!reservation) {
            return res.status(404).send();
        }
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve reservations by user ID
router.get('/reservation/:user_id', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        const reservations = await Reservation.find({ user_id: req.params.user_id });
        res.render('yourReservation', {
            layout: "./layouts/main_layouts",
            title: "Your Reservations",
            reservations, // Pass the reservations data to the frontend
            userLogin // Assuming req.user contains the logged-in user's data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve a single reservation by reservation ID
router.get('/reservation/detail/:id_reservation', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        const reservation = await Reservation.findById(req.params.id_reservation);
        if (!reservation) {
            return res.status(404).send();
        }
        res.render('detailReservation', {
            layout: "./layouts/main_layouts",
            title: "Reservation Details",
            reservation, // Pass the single reservation data to the frontend
            userLogin // Assuming req.user contains the logged-in user's data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/getReservation/:restaurantId', async (req, res) => {

    const userLogin = req.session.userLogin;
    const { restaurantId } = req.params;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    if (userLogin._id.toString() === "1") {
        // Jika ID pengguna adalah "1", redirect ke halaman utama
        return res.redirect('/login');
    }

    try {
        res.render('reservation', {
            layout: "./layouts/main_layouts",
            title: "Reservation",
            userLogin,
            restaurantId
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;