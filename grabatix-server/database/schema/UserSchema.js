const mongoose = require(`mongoose`)
const RolesSchema = require('./RolesSchema')
const CloudinaryImageSchema = require('./CloudinaryImageSchema');
const AddressSchema = require('./AddressSchema');
const { Schema } = mongoose
mongoose.Promise = Promise

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  generatedFrom: String,
  roles: [RolesSchema],
  addedDate: {
    type: Date,
    default: Date.now,
  },
  tokens: [],
  ProfileImage: {
    type: CloudinaryImageSchema,
  },
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
  BillAddr: {
    type: AddressSchema,
  },
})

module.exports = UserSchema
