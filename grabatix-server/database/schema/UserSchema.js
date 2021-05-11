const mongoose = require(`mongoose`)
const { REGEX } = require(`../../config`)
const CloudinaryImageSchema = require(`./CloudinaryImageSchema`)
const AddressSchema = require(`./AddressSchema`)
const RoleSchema = require(`./RoleSchema`)
const { Schema } = mongoose
mongoose.Promise = Promise

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, `Username must be a valid email address and is required.`],
    unique: true,
    validate: {
      validator: (v) => REGEX.emailAddress.test(v),
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
  },
  generatedFrom: String,
  roles: [
    {
      type: RoleSchema,
    },
  ],
  addedDate: {
    type: Date,
    default: Date.now,
  },
  tokens: [],
  ProfileImage: {
    type: CloudinaryImageSchema,
  },
  displayName: String,
  title: String,
  givenName: String,
  familyName: String,
  suffix: String,
  PrimaryEmailAddr: {
    Address: String,
  },
  PrimaryPhone: {
    FreeFormNumber: String,
  },
  BillAddr: {
    type: AddressSchema,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

module.exports = UserSchema
