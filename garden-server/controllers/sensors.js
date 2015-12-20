'use strict';
const sensors = require('../models/sensors');

module.exports = {
    insertData: insertData,
    getData: getData
};

function insertData(doc) {
    return sensors.create(doc);
}

function getData(reqQuery) {
    var query = reqQuery || {};
    return sensors.find(query);
}
