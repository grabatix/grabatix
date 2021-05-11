const { to } = require(`await-to-js`)
const { paymentSchema } = require(`../../utils/payment-schema`)
const { createTransaction } = require(`../../database/Transaction`)
const {
  INTUIT: { PAYMENTS_API },
} = require(`../../config`)
const uuidv4 = require(`uuid/v4`)

const createQuickBooksOptionsObject = (method = `POST`, body, accessToken) => {
  // console.log({ oauth2_token_json });
  const headers = {
    Accept: `application/json`,
    'Request-Id': uuidv4(),
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': `application/json;charset=UTF-8`,
  }
  return {
    headers,
    method,
    body: JSON.stringify(body),
  }
}

// GET details of existing user.
exports.postTransaction = async (req, res) => {
  const companyId = req.company.id
  const userId = req.params.userId
  const accessToken = req.company.tokens.access_token
  const paymentsUri =
    process.NODE_ENV !== `production`
      ? `https://sandbox.api.intuit.com`
      : `https://api.intuit.com`
  const body = {
    amount: `10.55`,
    card: {
      expYear: `2020`,
      expMonth: `02`,
      address: {
        region: `CA`,
        postalCode: `94086`,
        streetAddress: `1130 Kifer Rd`,
        country: `US`,
        city: `Sunnyvale`,
      },
      name: `emulate=0`,
      cvc: `123`,
      number: `4111111111111111`,
    },
  }
  const payment = {
    context: {
      mobile: false,
      isEcommerce: true,
    },
    currency: `USD`,
    amount: `10.55`,
  }
  const transactionData = {
    userId,
    companyId,
    cart: req.body.cart,
    total: req.body.total,
  }
  let transaction
  try {
    transaction = await createTransaction(transactionData)
  } catch (err) {
    return res.status(500).json({ error: { message: `DB Error`, data: err } })
  }

  res.status(201).json({ transaction: transaction.id })
}
