const mongoose = require('mongoose');
const { Schema } = mongoose;
const CloudinaryImageSchema = require('./CloudinaryImageSchema');

mongoose.Promise = Promise;

const EmployeeSchema = new Schema({
  grabatixUser: { type: Schema.Types.ObjectId, ref: `User` },
  GivenName: String,
  FamilyName: String,
  PrimaryEmailAddr: {
    Address: String,
  },
  Id: String,
  V4IDPseudonym: String,
  SyncToken: String,
  ProfileImage: {
    type: CloudinaryImageSchema,
  },
});

module.exports = EmployeeSchema;
