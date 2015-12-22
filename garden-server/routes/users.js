'use strict';
const express = require('express');
const router  = express.Router();
const users   = require('../controllers/users');

router.post('/', function(req, res, next) {
    return users.createNewGarden(req.body)
    .then(function(newDoc) {
        return res.json(newDoc);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    return users.get(req.query)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

module.exports = router;
