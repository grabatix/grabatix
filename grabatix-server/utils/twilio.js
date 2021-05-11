const twilio = require(`twilio`)
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const sendSMS = async (items = [], phone) => {
  try {
    const client = twilio(accountSid, authToken)
    const message = await client.messages.create({
      body: `This is the ship that made the Kessel Run in fourteen parsecs?`,
      from: process.env.TWILIO_NUMBER,
      to: `+1${phone}`,
    })
    return message
  } catch (err) {
    return err
  }
}

module.exports = { sendSMS }
