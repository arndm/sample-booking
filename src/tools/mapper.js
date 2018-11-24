'use strict';

const DbConn = require('./MockData');
const Booking = require('./bookingModel');
const fs = require('fs');
/*
 *Create objects from sample files
 *Create array of objects to put into mock db
 */
const samp1 = fs.readFileSync('./src/tools/sample/bookingSample1.json', 'utf-8');
const samp2 = fs.readFileSync('./src/tools/sample/bookingSample2.json', 'utf-8');
const samp3 = fs.readFileSync('./src/tools/sample/bookingSample3.json', 'utf-8');
const b1 = new Booking(samp1);
const b2 = new Booking(samp2);
const b3 = new Booking(samp3);
const dataDump = [b1.get(), b2.get(), b3.get()];
let mock = new DbConn(dataDump);
//more samples can be added above


let mapBookingList = async function(uid) {

    let rawList = await mock.fetchBookingList(uid).catch(e => console.log(e));

    return rawList.map((bookingEach) => {
        return {
            bookingId: bookingEach._id,
            lastName: bookingEach.bookingData.passenger.lastName,
            departure: bookingEach.bookingData.flights[0].departure
        };
    });
};

let mapBookingDetail = async function(bookingId) {

    let rawBooking = await mock.fetchBookingDetail(bookingId).catch(e => console.log(e));

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

module.exports = {
    mapBookingList,
    mapBookingDetail
};
