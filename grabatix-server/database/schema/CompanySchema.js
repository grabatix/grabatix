const mongoose = require(`mongoose`)
const { Schema } = mongoose
const { decimal2JSON } = require(`../../utils/mongoose`)
const { REGEX } = require(`../../config`)

const ProductSchema = require(`./ProductSchema`)
const IntuitTokenSchema = require(`./IntuitTokenSchema`)
const CloudinaryImageSchema = require(`./CloudinaryImageSchema`)
const AddressSchema = require(`./AddressSchema`)
const SubscriptionSchema = require(`./SubscriptionSchema`)

mongoose.Promise = Promise

const CompanySchema = new Schema({
  grabatixIdentifier: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => REGEX.gbtxIdent.test(v),
      message: (props) =>
        `${props.value} is not a valid Grabatix Identifier. Omit special characters and spaces.`,
    },
  },
  logo: {
    type: CloudinaryImageSchema,
  },
  realmId: {
    type: String,
    unique: true,
  },
  companyName: {
    type: String,
    default: ``,
  },
  users: {
    type: [{ type: Schema.Types.ObjectId, ref: `User` }],
  },
  WebAddr: {
    type: String,
  },
  emailAddress: {
    type: String,
    validate: {
      validator: (v) => REGEX.emailAddress.test(v),
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  addresses: [{ type: AddressSchema }],
  phone: {
    type: String,
  },
  products: [ProductSchema],
  tokens: {
    type: IntuitTokenSchema,
  },
  isInvited: {
    type: Boolean,
    default: false,
  },
  invitation: {
    type: Schema.Types.ObjectId,
    ref: `Invitation`,
  },
  isQuickbooksAuthorized: {
    type: Boolean,
    default: false,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: SubscriptionSchema,
  },
})

CompanySchema.set(`toJSON`, {
  transform: (doc, ret) => {
    decimal2JSON(ret)
    return ret
  },
})

module.exports = CompanySchema
