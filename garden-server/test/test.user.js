'use strict';
const should   = require('should');
const mongoose = require('mongoose');
const Account  = require('../models/account.js');
var db;

describe('Account', function() {

    before(function(done) {
        db = mongoose.connect('mongodb://localhost/test');
        return done();
    });

    after(function(done) {
        mongoose.connection.close();
        return done();
    });

    beforeEach(function(done) {
        var account = new Account({
            username: '12345',
            password: 'testy'
        });

        account.save(function(error) {
            if (error) {
                console.log('error' + error.message);
            } else {
                console.log('no error');
            }
            return done();
        });
    });

    it('find a user by username', function(done) {
        Account.findOne({ username: '12345' }, function(err, account) {
            account.username.should.eql('12345');
            console.log("   username: ", account.username);
            return done();
        });
    });

    afterEach(function(done) {
        Account.remove({}, function() {
            return done();
        });
    });

});
