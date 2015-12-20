'use strict';
const sensorData = require('../models/sensorData');

module.exports = {
    insertData: insertData,
    getData: getData,
    getLatest: getLatest
};

function insertData(doc) {
    return sensorData.create(doc);
}

function getData(reqQuery) {
    var query = reqQuery || {};
    return sensorData.find(query);
}

function getLatest(type) {
    var query = {
        type: type
    };
    return sensorData
    .findOne(query)
    .sort({ _id: -1 })
    .populate('sensor');
}
