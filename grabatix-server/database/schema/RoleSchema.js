const mongoose = require(`mongoose`)
const { ROLES } = require(`../../config`)
const { Schema } = mongoose
mongoose.Promise = Promise

const RolesSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: `Company` },
  role: {
    type: String,
    validate: {
      validator: (v) => Object.values(ROLES).includes(v),
      message: (props) => `${props.value} is not a defined Role.`,
    },
  },
})

module.exports = RolesSchema
