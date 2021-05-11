const mongoose = require(`mongoose`)
const { Schema } = mongoose

mongoose.Promise = Promise

const AddressSchema = new Schema({
  city: String,
  country: String,
  address1: String,
  address2: String,
  postalCode: String,
  state: String,
  Id: String,
})

module.exports = AddressSchema
