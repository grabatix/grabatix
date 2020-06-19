const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const CloudinaryImageSchema = new Schema({
  width: Number,
  height: Number,
  format: String,
  resource_type: String,
  created_at: String,
  url: String,
  secure_url: String,
});

module.exports = CloudinaryImageSchema;
