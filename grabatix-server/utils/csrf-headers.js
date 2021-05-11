const { unpackToken } = require(`./jwt`)
const { decrypt } = require(`./crypto`)
const { JWT } = require(`../config`)

/**
 * Function that unpacks csrf token and validates
 * @param {String} authHeader - String expecting format of `Token <value>`
 * @return {Boolean}
 */
const verifyCSRFToken = async (authHeader = `Token `) => {
  const csrfToken = authHeader.replace(`Token `, ``)
  if (!csrfToken) {
    return false
  }
  try {
    const payload = await unpackToken(csrfToken)
    const secret = await decrypt(payload.csrf)
    return secret === JWT.CSRF_TOKEN_SECRET
  } catch (err) {
    console.error({ csrfVerficationError: err })
    return false
  }
}

module.exports = { verifyCSRFToken }
