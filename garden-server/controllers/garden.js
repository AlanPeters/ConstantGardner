'use strict';
const garden   = require('../models/garden');
const Promise  = require('bluebird');
const geocoder = require('geocoder');
const geocode  = Promise.promisify(geocoder.geocode, { context: geocoder });

module.exports = {
    createNewGarden: createNewGarden,
    getByOwner: getByOwner,
    getByParticipant: getByParticipant
};

function createNewGarden(doc, userId) {
    const location = [doc.address, doc.city, doc.state].join(); // TODO zip
    return geocode(location)
    .then(function(data) {
        const latlon  = data.results[0].geometry.location;
        doc.owner     = userId;
        doc.latitude  = latlon.lat;
        doc.longitude = latlon.lng;
        doc.participants.push(userId);
        return garden.create(doc);
    });
}

function getByOwner(userId) {
    return garden.find({ owner: userId }).lean();
}

function getByParticipant(userId) {
    return garden.find({ participants: userId }).lean();
}
