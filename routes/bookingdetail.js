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
  log.debug("flights for booking details",JSON.stringify(rawBooking.bookingData.flights));

    return {
        id: rawBooking._id,
        passenger: {
            firstName: rawBooking.bookingData.passenger.firstName,
            lastName: rawBooking.bookingData.passenger.lastName,
            email: rawBooking.bookingData.passenger.email
        },
        flights: mapFlightDetails(rawBooking.bookingData.flights)
    };

};

let mapFlightDetails = (flights) => {

    const seg = flights.map(leg => {

        let lastFlight = leg[leg.length - 1];
        let firstFlight = leg[0];
        log.debug("firstFlight", firstFlight);
        log.debug("lastFlight", firstFlight);

        let newLeg = {
            departure: firstFlight.departure,
            arrival: lastFlight.arrival,
            departureDate: firstFlight.departureDate,
            arrivalDate: lastFlight.arrivalDate
        }

        return newLeg;
    });
    log.debug("segment", seg);
    
    return seg;
}

module.exports = router;
