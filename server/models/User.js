'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: { unique: true }
    },
});

  

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);