'use strict';

const mongodb = require('mongo-mock');
const MongoClient = mongodb.MongoClient;
MongoClient.persist = "src/tools/sample/mongo-mockdb.js";
const dbUrl = 'mongodb://mockserver/assignmentdb';

class MockData {

    constructor(dataDump) {
        this.dataDump = dataDump;
    }

    fetchBookingList(passengerId) {
        /* fetches booking details against a passenger Id*/

        return new Promise((resolve, reject) => {
            // Put data to database at the before quering
            this.putItem(this.dataDump).then((collection) => {
                MongoClient.connect(dbUrl, {}, function(err, db) {

                    db.collection('BookingCollection').find({
                        passengerId: passengerId
                    }).toArray(function(err, doc) {
                        if (err) reject(`Error caught in fetchBookingList: ${err}`);
                        //console.debug('Result:', doc);
                        let cleanup = () => {
                            let state = collection.toJSON();
                            state.documents.length = 0;
                            db.close();
                        }; // Cleanup the collection after completing the query
                        setTimeout(cleanup, 1000);

                        resolve(doc);
                    });
                });
            });
        });
    }

    fetchBookingDetail(bookingId) {
        /* fetches booking list against a booking Id*/

        return new Promise((resolve, reject) => {
            this.putItem(this.dataDump).then((collection) => {
                MongoClient.connect(dbUrl, {}, function(err, db) {

                    db.collection('BookingCollection').findOne({
                        _id: bookingId
                    }, function(err, doc) {
                        if (err) reject("Error caught in fetchBookingList", err);
                        //console.debug('Result:', doc);
                        let cleanup = () => {
                            let state = collection.toJSON();
                            state.documents.length = 0;
                            db.close();
                        }; // Cleanup the collection after completing the query
                        setTimeout(cleanup, 1000);

                        resolve(doc);
                    });
                });
            });
        });

    }

    /*
     * Put Item function called internally by the get function to put some mock objects
     */
    putItem(data) {

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, function(err, db) {

                let BookingCollection = "BookingCollection";
                db.createCollection(BookingCollection, function(err, BookingCollection) {
                    let collection = db.collection('BookingCollection');
                    collection.insertMany(data, function(err, result) {
                        if (err) reject(`Some database errors: ${err}`);
                        db.close();
                        //console.debug("result",result);
                        resolve(collection);
                    });
                });
            });
        });
    }

} //end of class

module.exports = MockData;
