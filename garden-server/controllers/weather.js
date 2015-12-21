'use strict';
const Forecast    = require('forecastio');
const Promise     = require('bluebird');
const garden      = require('../models/garden');
const forecast    = new Forecast('3ab97124dda0e9d9dc7aa776155cf6bf'); //FIXME put key in config
const getForecast = Promise.promisify(forecast.forecast, {context: forecast});

module.exports = {
    getForecast: getForecast,
    getMyForecast: getMyForecast
};

function getMyForecast() {
    return garden.findOne({}, { 'latitude': true, 'longitude': true }) //TODO may pass user's garden data in request, db hit may not be needed
    .then(function(data) {
        return getForecast(data.latitude, data.longitude);
    });
}
