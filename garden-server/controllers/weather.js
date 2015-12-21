'use strict';
const Forecast = require('forecastio');
const Promise  = require('bluebird');

const forecast = new Forecast('3ab97124dda0e9d9dc7aa776155cf6bf');

const getForecast = Promise.promisify(forecast.forecast, {context: forecast});

module.exports = {
    getForecast: getForecast
};
