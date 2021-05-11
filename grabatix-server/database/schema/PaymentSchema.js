const SimpleSchema = require(`simpl-schema`)
const { REGX } = require(`../../config`)

const paymentSchema = new SimpleSchema({
  total: Number,
  card: Object,
  'card.expYear': {
    type: String,
    regEx: REGX.ccYear,
  },
  'card.expMonth': {
    type: String,
    regEx: REGX.ccMonth,
  },
  'card.address': Object,
  'card.address.region': String,
  'card.address.postalCode': {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode,
  },
  'card.address.streetAddress': String,
  'card.address.country': String,
  'card.address.city': String,
  'card.name': String,
  'card.cvc': {
    type: String,
    regEx: REGX.cvvCode,
  },
  'card.number': {
    type: String,
    regEx: REGX.creditCard,
  },
})

module.exports = {
  paymentSchema,
}
