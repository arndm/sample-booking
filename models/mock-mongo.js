'use strict';

const mongodb = require('mongo-mock');
const MongoClient = mongodb.MongoClient;
MongoClient.persist = "models/sample/mongo-mockdb.js";
const dbUrl = 'mongodb://mockserver/assignmentdb';
const fs = require('fs');
const transform = require('./bookingModel'); // Model structure for mock Mongo DB BookingCollection Mongo db Collection, can be modelled using Mongoose in real
let log = require("loglevel");
log.setLevel('debug');

/*
* The data for this mock library needs to be initialized
* For each get function, it is first initialized with sample data, transformed by the booking model
*/

const fetchBookingList = function(passengerId) {
    /* fetches booking details against a passenger Id*/

    return new Promise((resolve, reject) => {

        putItem(getSamples()).then((collection) => {
            MongoClient.connect(dbUrl, {}, function(err, db) {

                db.collection('BookingCollection').find({
                    passengerId: passengerId
                }).toArray(function(err, doc) {
                    if (err) reject(`Error caught in fetchBookingList: ${err}`);
                    //log.debug('fetch booking list Result:', doc);
                    let cleanup = () => {
                        let state = collection.toJSON();
                        state.documents.length = 0;
                        db.close();
                    }; // Cleanup the collection after completing the query
                    setTimeout(cleanup, 1);

                    resolve(doc);
                });
            });
        });
    });
};

const fetchBookingDetail = function(bookingId) {
    /* fetches booking list against a booking Id*/

    return new Promise((resolve, reject) => {
        putItem(getSamples()).then((collection) => {
            MongoClient.connect(dbUrl, {}, function(err, db) {

                db.collection('BookingCollection').findOne({
                    _id: bookingId
                }, function(err, doc) {
                    if (err) reject("Error caught in fetchBookingList", err);
                    //log.debug('fetch booking detail result:', doc);
                    let cleanup = () => {
                        let state = collection.toJSON();
                        state.documents.length = 0;
                        db.close();
                    }; // Cleanup the collection after completing the query
                    setTimeout(cleanup, 1);

                    resolve(doc);
                });
            });
        });
    });

};

const putItem = function(data) {

    return new Promise((resolve, reject) => {
        MongoClient.connect(dbUrl, function(err, db) {

            let BookingCollection = "BookingCollection";
            db.createCollection(BookingCollection, function(err, BookingCollection) {
                let collection = db.collection('BookingCollection');
                collection.insertMany(data, function(err, result) {
                    if (err) reject(`Some database errors: ${err}`);
                    db.close();
                    //log.debug("put item result",result);
                    resolve(collection);
                });
            });
        });
    });
};

const getSamples = function() {
   // Gets sample data from the files, one can add more files in the samples folder and add to the dataDump stack for mocking
    let dataDump = [];
    try {
        dataDump.push(transform(fs.readFileSync('./models/sample/bookingSample1.json', 'utf-8')));
        dataDump.push(transform(fs.readFileSync('./models/sample/bookingSample2.json', 'utf-8')));
        dataDump.push(transform(fs.readFileSync('./models/sample/bookingSample3.json', 'utf-8')));

        return dataDump;
    } catch (err) {
        log.error("Error in loading samples", err);
        return err;
    }
};

module.exports = {
    fetchBookingList,
    fetchBookingDetail
};
