'use strict';

const express = require('express');
const mapper = require('./tools/mapper');
const momentTz = require('moment-timezone');
const log = console.log;
let app = express();
//app.use(bodyParser.json());

let timeNow = (req, res, next) => {
 log(
  `***Current Time : ${momentTz().tz("Asia/Kolkata").format()}***`
 );
 next();
};
app.use(timeNow);

app.get('/bookings/:bookingid', async function(req, res) {
 log(`Request received to get Booking Details for Booking Id: ${req.params.bookingid}`);
 let response = await mapper.mapBookingDetail(req.params.bookingid);
 log(`Response sent for Booking Id ${req.params.bookingid}: \n ${JSON.stringify(response)}`);
 res.json(response);
});

app.get('/bookings', async function(req, res) {
 log(`Request received to get Booking List for Passenger Id: ${req.query.uid}`);
 let response = await mapper.mapBookingList(req.query.uid);
 log(`Response sent for Passenger Id ${req.query.uid}: \n ${JSON.stringify(response)}`);
 res.json(response);
});

 app.listen(3000, function() {
 log('Server is listening on port 3000');
});
