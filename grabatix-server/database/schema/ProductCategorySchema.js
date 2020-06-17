const mongoose = require('mongoose');
const { Schema } = mongoose;
const CloudinaryImageSchema = require('./CloudinaryImageSchema');

mongoose.Promise = Promise;

const ProductCategorySchema = new Schema({
  Id: String,
  SyncToken: String,
  Name: String,
  Type: String,
  SubItem: Boolean,
  ParentRef: {
    name: String,
    value: String,
  },
  Icon: {
    type: CloudinaryImageSchema,
  },
});

module.exports = ProductCategorySchema;
