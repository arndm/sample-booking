const express = require('express');
const router = express.Router();
const bookingList = require('../models/mock-mongo');
let log = require("loglevel");
log.setLevel('debug');

router.get('/bookings', async function(req, res, next) {

    log.info(`Request received to get Booking List for Passenger Id: ${req.query.uid}`);
    try {
        let response = mapper(await bookingList.fetchBookingList(req.query.uid));
        
        if (response.length == 0) {
            response = JSON.stringify("No data found for " + req.query.uid);
            log.info(`Response sent for Passenger Id ${req.query.uid}: \n response`);
            res.status(404).send(response);
        } else {
            log.info(`Response sent for Passenger Id ${req.query.uid}: \n ${JSON.stringify(response)}`);
            res.send(response);
        }
    } catch (err) {
        log.error("Error for route bookinglist", err);
        next(err);
    }
});


let mapper = (rawList) => {

    return rawList.map((bookingEach) => {
        return {
            bookingId: bookingEach._id,
            lastName: bookingEach.bookingData.passenger.lastName,
            departure: bookingEach.bookingData.flights[0].departure
        };
    });

};

module.exports = router;
