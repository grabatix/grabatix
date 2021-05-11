const SimpleSchema = require(`simpl-schema`)

const paymentSchema = new SimpleSchema({
  total: Number,
  card: Object,
  'card.expYear': {
    type: String,
    regEx: /^(20[2-9][0-9])$/,
  },
  'card.expMonth': {
    type: String,
    regEx: /^((0[1-9])|(1[0-2]))$/,
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
    regEx: /[0-9]{3,4}/,
  },
  'card.number': {
    type: String,
    regEx: /^(([3]{1}[0-9]{14})|([4-6]{1}[0-9]{15}))$/,
  },
})

module.exports = {
  paymentSchema,
}
