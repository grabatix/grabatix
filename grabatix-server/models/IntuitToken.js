const mongoose,  { Schema } = require('mongoose');

mongoose.Promise = Promise;

const IntuitTokenSchema = new Schema({
    "access_token": String,
    "refresh_token": String,
    "token_type": String,
    "expires_in": Number,
    "x_refresh_token_expires_in": Number,
    "id_token": String
})

module.exports = IntuitTokenSchema;