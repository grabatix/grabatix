const mongoose = require('mongoose');
const { Schema } = mongoose;

const CloudinaryImageSchema = require('./CloudinaryImageSchema');
const AddressSchema = require('./AddressSchema');
const TransactionSchema = require('./TransactionSchema');

mongoose.Promise = Promise;

const CustomerSchema = new Schema({
  grabatixUser: { type: Schema.Types.ObjectId, ref: `User` },
  DisplayName: String,
  Title: String,
  GivenName: String,
  FamilyName: String,
  Suffix: String,
  PrimaryEmailAddr: {
    Address: String,
  },
  PrimaryPhone: {
    FreeFormNumber: String,
  },
  Id: String,
  BillAddr: {
    type: AddressSchema,
  },
  SyncToken: String,
  ProfileImage: {
    type: CloudinaryImageSchema,
  },
  Transactions: {
    type: [TransactionSchema],
  },
});

module.exports = CustomerSchema;
