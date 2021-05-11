const jwt = require(`jsonwebtoken`)
const { encrypt } = require(`./crypto`)
const { JWT } = require(`../config`)

/**
 * Function that calls the sign method of jsonwebtoken and returns a serialized token
 * @param {Object} [payload={}] - An Object containing key/value pairs of the data being encrypted within the token
 * @param {Object} [options={}] - options object - https://www.npmjs.com/package/jsonwebtoken
 * @return {String} signed and serialized jsonwebtoken
 */
const signToken = (payload = {}, options = {}) =>
  jwt.sign(
    { ...payload, csrf: encrypt(JWT.CSRF_TOKEN_SECRET) },
    JWT.JWT_ACCESS_TOKEN_SECRET,
    options
  )

/**
 * Function verifies that a token is valid, meaning it was created with the secret and is not expired
 * @param {String} token
 * @return {Promise} either the payload of the valid token or an error thrown by the verify method
 */
const unpackToken = async (token) => {
  try {
    const payload = await jwt.verify(token, JWT.JWT_ACCESS_TOKEN_SECRET)
    return payload
  } catch (err) {
    return err
  }
}

module.exports = {
  signToken,
  unpackToken,
}
