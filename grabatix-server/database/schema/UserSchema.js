const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const UserSchema = new Schema({
    email: String,
    password: String,
    businessName: String,
    firstName: String,
    lastName: String,
    displayName: String,
    providerId: String,
    provider: String,
    role: String
});

module.exports = UserSchema;