'use strict';
const express  = require('express');
const passport = require('passport');
const Account  = require('../models/account');
const router   = express.Router();

router.get('/', function(req, res) {
    return res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    return res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { info: 'Sorry. That username already exists. Try again.' });
        } else {
            passport.authenticate('local')(req, res, function() {
                return res.redirect('/');
            });
        }
    });
});

router.get('/login', function(req, res) {
    return res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    return res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    return res.redirect('/');
});

router.get('/ping', function(req, res){
    return res.status(200).send('pong!');
});

module.exports = router;
