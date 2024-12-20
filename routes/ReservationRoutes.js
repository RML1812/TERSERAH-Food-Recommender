const express = require('express');
const { Transaction } = require("../model/transaction.js");
const { Reservation } = require("../model/reservation.js");
const { migrateRatings, updateRestaurantReferences, checkAuth, snap } = require("../function/function");
const { Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView } = require("../model/restaurant");
const router = express.Router();
const schedule = require('node-schedule');

// Handle reservation
router.post('/reservation/:restaurantId', async (req, res) => {
    const userLogin = req.session.userLogin;
    const { restaurantId } = req.params;
    const { tanggalReservation, name, jumlahOrang, noHP, waktuMulai, waktuSelesai } = req.body;

    const startTime = new Date(tanggalReservation + 'T' + waktuMulai);
    const endTime = new Date(tanggalReservation + 'T' + waktuSelesai);

    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    const pricePerPerson = 5000;
    const pricePerHour = 10000;
    let totalHarga = jumlahOrang * pricePerPerson + durationHours * pricePerHour;
    totalHarga = Math.round(totalHarga);

    try {
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
        res.status(201).json({ message: "Reservation created", newReservation });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// Generate and return a transaction token
router.get('/get-transaction-token', async (req, res) => {
    const userLogin = req.session.userLogin;
    const { reservation_id } = req.query;

    try {
        if (!userLogin) {
            console.error('User not logged in');
            return res.status(401).json({ error: "User not logged in" });
        }

        console.log('Fetching transaction token for reservation_id:', reservation_id);

        const existingTransaction = await Transaction.findOne({ reservation_id: reservation_id });

        if (existingTransaction) {
            console.log('Existing transaction found:', existingTransaction);
            res.json({ transactionToken: existingTransaction.transactionToken });
        } else {
            const newReservation = await Reservation.findById(reservation_id);
            if (!newReservation) {
                console.error('Reservation not found:', reservation_id);
                return res.status(404).json({ error: 'Reservation not found' });
            }

            const parameter = {
                "transaction_details": {
                    "order_id": newReservation._id.toString(),
                    "gross_amount": newReservation.totalHarga
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": newReservation.name,
                    "phone": newReservation.noHP
                },
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
                console.log('New transaction created:', newTransaction);
                res.json({ transactionToken: transactionTokenResponse.token });
            } else {
                console.error('Failed to create transaction token.');
                res.status(500).json({ error: 'Failed to create transaction token.' });
            }
        }
    } catch (error) {
        console.error('Error generating transaction token:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


// Save reservation
router.post('/save-reservation', async (req, res) => {
    try {
        const existingReservation = await Reservation.findOne({
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            jumlahOrang: req.body.jumlahOrang,
            noHP: req.body.noHP,
            tanggalReservation: req.body.tanggalReservation,
            waktuMulai: req.body.waktuMulai,
            waktuSelesai: req.body.waktuSelesai,
            totalHarga: req.body.totalHarga
        });

        if (existingReservation) {
            res.json(existingReservation);
        } else {
            const newReservation = new Reservation(req.body);
            await newReservation.save();
            res.json(newReservation);
        }
    } catch (error) {
        console.error('Error saving reservation:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Handle payment finish
router.get('/payment/finish', async (req, res) => {
    const { reservation_id } = req.query;

    try {
        const transaction = await Transaction.findOne({ 'reservation_id': reservation_id });
        if (transaction) {
            transaction.status = 'Success';
            await transaction.save();

            const reservation = await Reservation.findById(reservation_id);
            const restaurant = await Restaurant.findById(reservation.restaurant_id);

            restaurant.slot -= reservation.jumlahOrang;
            await restaurant.save();

            const combinedEndTime = new Date(`${reservation.tanggalReservation}T${reservation.waktuSelesai}`);
            const jobName = `restore-slots-${reservation_id}`;
            const existingJob = schedule.scheduledJobs[jobName];
            if (existingJob) {
                existingJob.cancel();
            }

            schedule.scheduleJob(jobName, combinedEndTime, async () => {
                try {
                    const currentReservation = await Reservation.findById(reservation_id);
                    const currentRestaurant = await Restaurant.findById(currentReservation.restaurant_id);

                    if (currentReservation && new Date(`${currentReservation.tanggalReservation}T${currentReservation.waktuSelesai}`).getTime() === combinedEndTime.getTime()) {
                        currentRestaurant.slot += currentReservation.jumlahOrang;
                        await currentRestaurant.save();
                    }
                } catch (jobError) {
                    console.error(`Failed to restore slots for reservation ${reservation_id}:`, jobError);
                }
            });

            res.redirect(`${process.env.VITE_FE}/paymentfinish`);
        } else {
            res.status(404).send('Transaction not found');
        }
    } catch (error) {
        console.error('Error processing payment finish:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get reservation details by restaurant ID
router.get('/getReservation/:restaurantId', async (req, res) => {
    const userLogin = req.session.userLogin;
    const { restaurantId } = req.params;

    if (!userLogin) {
        return res.status(401).json({ error: "Akses tidak sah" });
    }

    if (userLogin._id.toString() === "1") {
        return res.redirect('/login');
    }
});

// Delete reservation
router.post('/delete-reservation', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.body.id_reservation);
        if (!reservation) {
            return res.status(404).send();
        }
        res.status(200).json({ message: "Reservation deleted", reservation });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get reservations by user ID
router.get('/reservasimu/:user_id', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        const reservations = await Reservation.find({ user_id: req.params.user_id });
        const reservationIds = reservations.map(reservation => reservation._id);
        const transactions = await Transaction.find({ reservation_id: { $in: reservationIds } });
        const restaurantIds = transactions.map(transaction => transaction.restaurant_id);
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

        res.status(200).json({
            message: "User Reservations",
            title: "Your Reservations",
            reservations,
            userLogin,
            transactions,
            restaurants
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get reservation details by reservation ID
router.get('/reservation/detail/:id_reservation', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        const reservations = await Reservation.findById(req.params.id_reservation);
        const transactions = await Transaction.findOne({ reservation_id: reservations._id });
        const restaurants = await Restaurant.findById(reservations.restaurant_id);

        res.status(200).json({
            message: "Reservation Details",
            title: "Reservation Details",
            reservations,
            userLogin,
            transactions,
            restaurants
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

router.get('/check-slot/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    const { tanggal, waktuMulai, waktuSelesai } = req.query;

    try {
        const reservations = await Reservation.find({
            restaurant_id: restaurantId,
            tanggalReservation: tanggal,
            waktuMulai: { $lte: waktuSelesai },
            waktuSelesai: { $gte: waktuMulai }
        });

        const restaurant = await Restaurant.findById(restaurantId);
        const totalReserved = reservations.reduce((sum, reservation) => sum + reservation.jumlahOrang, 0);
        const availableSlots = restaurant.slot - totalReserved;

        res.status(200).json({ availableSlots });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
