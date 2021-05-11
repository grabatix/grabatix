const mongoose = require(`mongoose`)
const { decimal2JSON } = require(`../../helpers/mongoose`)
const { Schema } = mongoose
const CloudinaryImageSchema = require(`./CloudinaryImageSchema`)
const DiscountSchema = require(`./DiscountSchema`)

const ProductImageSchema = new Schema({
  icon: {
    type: CloudinaryImageSchema,
  },
  backgroundImage: {
    type: CloudinaryImageSchema,
  },
})

mongoose.Promise = Promise

const ProductSchema = new Schema({
  productId: String,
  isActive: Boolean,
  displayLabel: {
    type: String,
    required: true,
  },
  description: String,
  useOptions: {
    maxUses: Number,
    startDate: Date,
    hasExpiration: {
      type: Boolean,
      default: false,
    },
    timeUntilExpiration: Number,
    expirationDate: Date,
  },
  eventOptions: {
    type: Schema.Types.ObjectId,
    ref: `Event`,
  },
  pricePoints: [
    {
      price: Schema.Types.Decimal128,
      minQuantity: Number,
      maxQuantity: Number,
    },
  ],
  discounts: [
    {
      DiscountSchema,
    },
  ],
  images: {
    type: ProductImageSchema,
  },
  productOrder: {
    type: Number,
  },
})

ProductSchema.set(`toJSON`, {
  transform: (doc, ret) => {
    decimal2JSON(ret)
    return ret
  },
})

module.exports = ProductSchema
