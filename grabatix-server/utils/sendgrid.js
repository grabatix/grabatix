const { SENDGRID } = require(`../config`)
const client = require(`@sendgrid/client`)

async function addSendgridRecipient(email) {
  client.setApiKey(SENDGRID.API_KEY)
  const data = [
    {
      email: email,
    },
  ]
  const request = {
    method: `POST`,
    url: `/v3/contactdb/recipients`,
    body: data,
  }

  try {
    const [response, body] = await client.request(request)
    return [response, null]
  } catch (error) {
    return [null, error]
  }
}

const validTemplates = [`CONFIRM`, `RECEIPT`]

async function sendEmail(email, template) {
  if (!validTemplates.includes(template)) {
    return [null, new Error(`Invalid Email Template`)]
  }
  client.setApiKey(SENDGRID.API_KEY)
  const data = {
    from: {
      email: SENDGRID[template].SENDER_EMAIL,
      name: SENDGRID[template].SENDER_NAME,
    },
    reply_to: {
      email: SENDGRID[template].SENDER_EMAIL,
    },
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
      },
    ],
    template_id: SENDGRID[template].TEMPLATE_ID,
  }

  const request = {
    method: `POST`,
    url: `/v3/mail/send`,
    body: data,
  }

  try {
    const [response, body] = await client.request(request)
    return [response, null]
  } catch (error) {
    return [null, error]
  }
}

module.exports = { sendEmail, addSendgridRecipient }
