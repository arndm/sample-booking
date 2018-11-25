const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../controllers/index');

describe('Unit testing the / route', async function() {

    describe('Unit test for bookinglist route', async function() {

        it('should return OK status', function() {
            return request(app)
                .get('/bookings/Booking1')
                .then(function(response) {
                    assert.equal(response.status, 200);
                })
        });

        it('should return 404 status', function() {
            return request(app)
                .get('/bookings/Booking1011')
                .then(function(response) {
                    assert.equal(response.status, 404);
                });
        });
    });

    describe('Unit test for booking details route', async function() {

        it('should return OK status', async function() {
            return request(app)
                .get('/bookings')
                .query({
                    uid: "Passenger1"
                })
                .then(function(response) {
                    assert.equal(response.status, 200);
                })
        });

        it('should return 404 status', async function() {
            return request(app)
                .get('/bookings')
                .query({
                    uid: "Passenger4"
                })
                .then(function(response) {
                    assert.equal(response.status, 404);
                })
        });

    });

});
