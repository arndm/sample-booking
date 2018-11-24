'use strict';

const isAirportValid = Symbol('isAirportValid');

 class Booking{

   constructor(booking_data){
     this[isAirportValid](JSON.parse(booking_data).flights);
     this.bookingData = JSON.parse(booking_data);
   }

   get(){

     return {
       _id : this.bookingData.bookingId,
       passengerId: this.bookingData.passengerDetails.passengerId,
       bookingData: {
         id : this.bookingData.bookingId,
         passenger: {
           firstName: this.bookingData.passengerDetails.firstName,
           lastName: this.bookingData.passengerDetails.lastName,
           email: this.bookingData.passengerDetails.emailId,
         },
         flights : this.bookingData.flights
         }
       };

     }

  update(booking_data){
    this[isAirportValid](JSON.parse(booking_data).flights);
    this.bookingData = booking_data;
  }

   // keeping this private for internal use only
   [isAirportValid] (flights) {

     flights.map(function (leg){
       if(leg.departure.length!=3 || leg.arrival.length!=3)
       throw new Error(`Airport Format is not not valid for leg : ${JSON.stringify(leg)}`);
     });

   }

 }

 module.exports = Booking;
