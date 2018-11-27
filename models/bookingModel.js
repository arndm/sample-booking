'use strict';

   function schema(bookingData){

    bookingData = JSON.parse(bookingData);

  bookingData.flights.map(function (flight){
      flight.map(function (leg){
       if(leg.departure.length!=3 || leg.arrival.length!=3)
       throw new Error(`Airport Format is not not valid for leg : ${JSON.stringify(leg)}`);
     });
 });
     return {
       _id : bookingData.bookingId,
       passengerId: bookingData.passengerDetails.passengerId,
       bookingData: {
         id : bookingData.bookingId,
         passenger: {
           firstName: bookingData.passengerDetails.firstName,
           lastName: bookingData.passengerDetails.lastName,
           email: bookingData.passengerDetails.emailId,
         },
         flights : bookingData.flights
         }
       };

     }

 module.exports = schema;
