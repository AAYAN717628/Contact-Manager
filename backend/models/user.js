const mongoose = require('mongoose');

const user = mongoose.Schema({
    username:        { type: String, required: true },
    todo:          { type: String },
    name: { type: String },
    token:   { type: String },
});

module.exports = mongoose.model('userData', user);