'use strict';
const garden = require('../models/garden');

module.exports = {
    createNewGarden: createNewGarden
};

function createNewGarden(doc) {
    return garden.create(doc);
}
