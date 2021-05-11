const mongoose = require(`mongoose`)
const { Schema } = mongoose
const { REGEX } = require(`../../config`)
mongoose.Promise = Promise

const InvitationSchema = new Schema({
  invitationStatus: {
    type: String,
    enum: [`requested`, `invited`, `redeemed`, `released`],
    default: `requested`,
  },
  invitationCode: {
    type: String,
  },
  emailAddress: {
    type: String,
    validate: {
      validator: (v) => REGEX.emailAddress.test(v),
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  company: { type: Schema.Types.ObjectId, ref: `Company` },
  requestedDate: {
    type: Date,
    default: Date.now,
  },
  invitedDate: {
    type: Date,
  },
  redeemedDate: {
    type: Date,
  },
  releasedDate: {
    type: Date,
  },
})

module.exports = InvitationSchema
