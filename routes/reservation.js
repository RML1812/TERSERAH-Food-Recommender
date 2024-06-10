const express = require('express');
const {Transaction} = require("../model/transaction.js")
const {Reservation} = require("../model/reservation.js")
const {migrateRatings, updateRestaurantReferences, checkAuth, snap} = require("../function/function")
const {Restaurant, CulinaryTypeView, PaymentMethodView, AvailableFacilityView, PriceRangeView} = require("../model/restaurant")
const router = express.Router();
const schedule = require('node-schedule');

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
    let totalHarga = jumlahOrang * pricePerPerson + durationHours * pricePerHour;
    totalHarga = Math.round(totalHarga);

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
        const existingTransaction = await Transaction.findOne({ reservation_id: reservation_id });
        
        if (existingTransaction) {
            // If a transaction exists, return the existing token
            res.json({ transactionToken: existingTransaction.transactionToken });
        }else{
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
                res.json({ transactionToken: transactionTokenResponse.token });
            } else {
                res.status(500).json({ error: 'Failed to create transaction token.' });
            }
        }
        
    } catch (error) {
        console.error('Error generating transaction token:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/save-reservation', async (req, res) => {
    try {
        // Check if a reservation with the same details already exists
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
            // If a reservation exists, respond with the existing reservation
            res.json(existingReservation);
        } else {
            // If no reservation exists, create a new one
            const newReservation = new Reservation(req.body);
            await newReservation.save();
            res.json(newReservation);
        }
    } catch (error) {
        console.error('Error saving reservation:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/payment/finish', async (req, res) => {
    const { reservation_id } = req.query;

    try {
        const transaction = await Transaction.findOne({ 'reservation_id': reservation_id });
        if (transaction) {
            transaction.status = 'Success';
            await transaction.save();

            const reservation = await Reservation.findById(reservation_id);
            const restaurant = await Restaurant.findById(reservation.restaurant_id);

            // Decrease the slot count by the number of people in the reservation
            restaurant.slot -= reservation.jumlahOrang;
            await restaurant.save();

            // Combine the reservation date and end time into a full Date object
            const combinedEndTime = new Date(`${reservation.tanggalReservation}T${reservation.waktuSelesai}`);

            // Define a unique job name using the reservation ID
            const jobName = `restore-slots-${reservation_id}`;

            // Cancel any existing job with the same name to prevent duplicates
            const existingJob = schedule.scheduledJobs[jobName];
            if (existingJob) {
                existingJob.cancel();
            }

            // Schedule a new job to restore the slots at the reservation's end time
            schedule.scheduleJob(jobName, combinedEndTime, async () => {
                try {
                    const currentReservation = await Reservation.findById(reservation_id);
                    const currentRestaurant = await Restaurant.findById(currentReservation.restaurant_id);

                    // Ensure the job is still relevant and the reservation end time hasn't changed
                    if (currentReservation && new Date(`${currentReservation.tanggalReservation}T${currentReservation.waktuSelesai}`).getTime() === combinedEndTime.getTime()) {
                        currentRestaurant.slot += currentReservation.jumlahOrang;
                        await currentRestaurant.save();
                    }
                } catch (jobError) {
                    console.error(`Failed to restore slots for reservation ${reservation_id}:`, jobError);
                }
            });

            res.redirect('/');
        } else {
            res.status(404).send('Transaction not found');
        }
    } catch (error) {
        console.error('Error processing payment finish:', error);
        res.status(500).send('Internal Server Error');
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
        // Find all reservations for the given user ID
        const reservations = await Reservation.find({ user_id: req.params.user_id });

        // Map the reservation IDs from the reservations array
        const reservationIds = reservations.map(reservation => reservation._id);

        // Find all transactions related to the reservation IDs
        const transactions = await Transaction.find({ reservation_id: { $in: reservationIds } });

        // Map the restaurant IDs from the transactions array
        const restaurantIds = transactions.map(transaction => transaction.restaurant_id);

        // Find all restaurants related to the restaurant IDs
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

        // Now you have an array of restaurants related to the transactions

        res.render('yourReservation', {
            layout: "./layouts/main_layouts",
            title: "Your Reservations",
            reservations, // Pass the reservations data to the frontend
            userLogin, // Assuming req.user contains the logged-in user's data
            transactions,
            restaurants
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve a single reservation by reservation ID
router.get('/reservation/detail/:id_reservation', async (req, res) => {
    const userLogin = req.session.userLogin;
    try {
        // Find all reservations for the given user ID
        const reservations = await Reservation.findById(req.params.id_reservation);

        // Find all transactions related to the reservation IDs
        const transactions = await Transaction.findOne({ reservation_id:  reservations._id });

        // Find all restaurants related to the restaurant IDs
        const restaurants = await Restaurant.findById(reservations.restaurant_id);
        res.render('detailReservation', {
            layout: "./layouts/main_layouts",
            title: "Reservation Details",
            reservations, // Pass the reservations data to the frontend
            userLogin, // Assuming req.user contains the logged-in user's data
            transactions,
            restaurants
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;