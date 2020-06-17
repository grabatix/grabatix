const mongoose = require(`mongoose`)
const { Schema } = mongoose
mongoose.Promise = Promise

const RolesSchema = new Schema({
  identifier: { type: Schema.Types.ObjectId, ref: `Company` },
  roles: [String],
})

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  generatedFrom: String,
  roles: [RolesSchema],
  addedDate: {
    type: Date,
    default: Date.now,
  },
  tokens: [],
})

module.exports = UserSchema
