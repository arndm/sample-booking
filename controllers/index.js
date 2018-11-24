'use strict';

const express = require('express');
const bookingList = require('../routes/bookinglist');
const momentTz = require('moment-timezone');
const bookingDetail = require('../routes/bookingdetail');
let log = require("loglevel");
log.setLevel('debug');
let app = express();

let timeNow = (req, res, next) => {
 log.info(
  `***New Request received at : ${momentTz().tz("Asia/Kolkata").format()}***`
 );
 next();
};

app.use(timeNow);

app.get('/bookings/:bookingid',bookingDetail);

app.get('/bookings',bookingList);

module.exports = app;
