const mongoose = require(`mongoose`)
const { Schema } = mongoose
mongoose.Promise = Promise

const DiscountSchema = new Schema({
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  startDate: Date,
  endDate: Date,
  minQuantity: Number,
  maxQuantity: Number,
  product: { type: Schema.Types.ObjectId, ref: `Product` },
  discountCode: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
  },
  discountedSetUnitPrice: {
    type: Schema.Types.Decimal128,
  },
  discountFromUnitPrice: {
    type: Schema.Types.Decimal128,
  },
  discountFromTotalPrice: {
    type: Schema.Types.Decimal128,
  },
  discountPercentage: {
    type: Number,
  },
})

DiscountSchema.set(`toJSON`, {
  transform: (doc, ret) => {
    decimal2JSON(ret)
    return ret
  },
})

module.exports = DiscountSchema
