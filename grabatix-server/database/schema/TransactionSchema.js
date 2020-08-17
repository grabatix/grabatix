const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promise = Promise

const TransactionSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: `Company`,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: `User`,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      productName: String,
      productId: Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  total: Schema.Types.Decimal128,
  modifications: Schema.Types.Mixed,
})

module.exports = TransactionSchema
