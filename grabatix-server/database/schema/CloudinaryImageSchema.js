const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const CloudinaryImageSchema = new Schema({
  public_id: String,
  version: Number,
  signature: String,
  width: Number,
  height: Number,
  access_control: [
    {
      access_type: String,
      start: String,
      end: String,
    },
  ],
  format: String,
  resource_type: String,
  created_at: String,
  tags: [],
  bytes: Number,
  type: String,
  etag: String,
  url: String,
  secure_url: String,
  original_filename: String,
  eager: [],
});

module.exports = CloudinaryImageSchema;
