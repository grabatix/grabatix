const OAUTH = {
  clientId: process.env.QB_CLIENT_ID,
  clientSecret: process.env.QB_CLIENT_SECRET,
  environment: process.env.NODE_ENV !== 'production' ? 'sandbox' : 'production',
  redirectUri: process.env.QB_REDIRECT_URI,
}

const PAYMENTS_API = {
  TOKENS: `/quickbooks/v4/payments/tokens`,
  CHARGES: `/quickbooks/v4/payments/charges`,
  ECHECKS: `/quickbooks/v4/payments/echecks`,
}

const MINOR_VERSION = `53`

const INTUIT = {
  PAYMENTS_API,
  MINOR_VERSION,
  OAUTH
}

module.exports = { INTUIT }
