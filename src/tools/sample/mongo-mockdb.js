var ObjectID = require('bson-objectid');

module.exports = {
  "mockserver": {
    "databases": {
      "assignmentdb": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              },
              {
                "name": "BookingCollection"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": [
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "assignmentdb.BookingCollection",
                "name": "_id_",
                "unique": true
              }
            ]
          },
          {
            "name": "BookingCollection",
            "documents": [
              {
                "_id": "Booking1",
                "passengerId": "Passenger1",
                "bookingData": {
                  "id": "Booking1",
                  "passenger": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john.doe@sample.com"
                  },
                  "flights": [
                    {
                      "departure": "HEL",
                      "arrival": "ARN",
                      "departureDate": "20181119",
                      "arrivalDate": "20181119"
                    },
                    {
                      "departure": "ARN",
                      "arrival": "DEL",
                      "departureDate": "20181119",
                      "arrivalDate": "20181120"
                    }
                  ]
                }
              },
              {
                "_id": "Booking2",
                "passengerId": "Passenger2",
                "bookingData": {
                  "id": "Booking2",
                  "passenger": {
                    "firstName": "Tom",
                    "lastName": "Hanks",
                    "email": "tom.hanks@sample.com"
                  },
                  "flights": [
                    {
                      "departure": "HEL",
                      "arrival": "CDG",
                      "departureDate": "20181120",
                      "arrivalDate": "20181120"
                    }
                  ]
                }
              },
              {
                "_id": "Booking3",
                "passengerId": "Passenger1",
                "bookingData": {
                  "id": "Booking3",
                  "passenger": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john.doe@sample.com"
                  },
                  "flights": [
                    {
                      "departure": "CDG",
                      "arrival": "IVL",
                      "departureDate": "20181124",
                      "arrivalDate": "20181124"
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    }
  }
}