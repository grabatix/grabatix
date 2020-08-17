const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = require('./ProductSchema');
const IntuitTokenSchema = require('./IntuitTokenSchema');
const CloudinaryImageSchema = require('./CloudinaryImageSchema');
const AddressSchema = require('./AddressSchema');

mongoose.Promise = Promise;

const EmailSchema = new Schema({
  Address: String,
})

const WebAddrSchema = new Schema({
  URI: String,
})

const PrimaryPhoneSchema = new Schema({
  FreeFormNumber: String,
})

const GrabatixSchema = new Schema({
  CompanyIdentifier: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  adminUsers: {
    type: [{ type: Schema.Types.ObjectId, ref: `User` }],
  },
  attendantUsers: {
    type: [{ type: Schema.Types.ObjectId, ref: `User` }],
  }
})

const CompanySchema = new Schema({
  grabatix: {
    type: GrabatixSchema,
  },
  subdomain: String,
  Logo: {
    type: CloudinaryImageSchema,
  },
  Id: String,
  SyncToken: String,
  CompanyName: String,
  WebAddr: {
    type: WebAddrSchema,
  },
  Email: {
    type: EmailSchema,
  },
  CustomerCommunicationAddr: {
    type: AddressSchema,
  },
  CompanyAddr: {
    type: AddressSchema,
  },
  PrimaryPhone: {
    type: PrimaryPhoneSchema,
  },
  products: [ProductSchema],
  tokens: {
    type: IntuitTokenSchema,
  },
});

module.exports = CompanySchema;
