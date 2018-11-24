/**
 * User Model and DB Handlers
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');
const { Schema } = require("mongoose");

// User Schema
const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    findById: async id => (await User.findById(id)),
    findByUsername: async username => (await User.findOne({ username })),
    addUser: async user => (await user.save())
};