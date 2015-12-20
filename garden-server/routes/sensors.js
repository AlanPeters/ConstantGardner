'use strict';
const express = require('express');
const router  = express.Router();
const sensors = require('../controllers/sensors');

router.post('/', function(req, res, next) {
    return sensors.insertData(req.body)
    .then(function(newDoc) {
        return res.json(newDoc);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    return sensors.getData(req.query)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

module.exports = router;
