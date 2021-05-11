const OAUTH = {
  clientId: process.env.QB_CLIENT_ID,
  clientSecret: process.env.QB_CLIENT_SECRET,
  environment: process.env.NETLIFY_DEV == `true` ? `sandbox` : `production`,
  redirectUri: `${process.env.URL}/.netlify/functions/auth-callback`,
}

const PAYMENTS_API = {
  TOKENS: `/quickbooks/v4/payments/tokens`,
  CHARGES: `/quickbooks/v4/payments/charges`,
  ECHECKS: `/quickbooks/v4/payments/echecks`,
}

const MINOR_VERSION = `54`

const INTUIT = {
  PAYMENTS_API,
  MINOR_VERSION,
  OAUTH,
}

module.exports = { INTUIT }
