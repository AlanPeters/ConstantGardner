'use strict';
const users = require('../models/users');

module.exports = {
    createNewuser: createNewUser
};

function createNewUser(doc) {
    return users.create(doc);
}
