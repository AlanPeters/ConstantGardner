'use strict';
const express = require('express');
const router  = express.Router();
const weather = require('../controllers/weather');

router.get('/:lat,:lon', function(req, res, next) {
    return weather.getForecast(req.params.lat, req.params.lon)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

module.exports = router;
