const mongoose = require(`mongoose`)
const { Schema } = mongoose

mongoose.Promise = Promise

const SubscriptionSchema = new Schema({
  plan: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  lastPaymentAmount: Number,
  lastPaymentDate: Date,
  nextPaymentDate: Date,
  nextPaymentAmount: Number,
  discountCode: String,
})

module.exports = SubscriptionSchema
