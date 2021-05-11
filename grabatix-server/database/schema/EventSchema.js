const mongoose = require(`mongoose`)
const { Schema } = mongoose

mongoose.Promise = Promise

const EventSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: `Product` },
  nameOfEvent: String,
  dateOfEvent: Date,
  maxTickets: Number,
})

module.exports = EventSchema
