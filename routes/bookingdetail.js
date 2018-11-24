const express = require('express');
const router = express.Router();
const bookingDetail = require('../models/mock-mongo');
let log = require("loglevel");
log.setLevel('debug');

router.get('/bookings/:bookingid', async function(req, res, next) {

    log.info(`Request received to get Booking Details for Booking Id: ${req.params.bookingid}`);
    try {
        let dbResponse = await bookingDetail.fetchBookingDetail(req.params.bookingid);

        if (dbResponse == null) {
            let response = "No data found for " + req.params.bookingid;
            log.info(`Response sent for Booking Id ${req.params.bookingid}: \n ${response}`);
            res.status(404).send(response);
        } else {
            let response = mapper(await bookingDetail.fetchBookingDetail(req.params.bookingid));
            log.info(`Response sent for Booking Id ${req.params.bookingid}: \n ${JSON.stringify(response)}`);
            res.json(response);
        }
    } catch (err) {
        log.error("error for route bookking/bookingid", err);
        next(err);
    }
});


let mapper = (rawBooking) => {

    return {
        id: rawBooking._id,
        passenger: {
            firstName: rawBooking.bookingData.passenger.firstName,
            lastName: rawBooking.bookingData.passenger.lastName,
            email: rawBooking.bookingData.passenger.email
        },
        flights: rawBooking.bookingData.flights
    };

};

module.exports = router;
