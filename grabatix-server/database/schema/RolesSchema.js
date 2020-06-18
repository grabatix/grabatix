const mongoose = require(`mongoose`)
const { Schema } = mongoose
mongoose.Promise = Promise

const RolesSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: `Company` },
  role: String,
})

module.exports = RolesSchema
