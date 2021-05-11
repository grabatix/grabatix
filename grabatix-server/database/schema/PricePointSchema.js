const mongoose = require(`mongoose`)
const { Schema } = mongoose
mongoose.Promise = Promise

const PricePointSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: `Product` },
  price: Schema.Types.Decimal128,
  minQuantity: Number,
  maxQuantity: Number,
})

module.exports = PricePointSchema
