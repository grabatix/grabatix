const cookie = require(`cookie`)

/**
 * Creates Cooke with a given name, token payload, and for a set number of minutes
 * @param {String} name
 * @param {String} token
 * @param {Number} minutes
 */
const createCookie = (name, token, minutes = 60) =>
  cookie.serialize(name, token, {
    secure: process.env.NETLIFY_DEV !== `true`,
    httpOnly: true,
    path: `/`,
    maxAge: 1000 * 60 * minutes,
  })

/**
 * Deletes a cookie with a given name
 * @param {String} name
 */
const clearCookie = (name) =>
  `${name}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`

const parseCookie = (serializedCookie) => cookie.parse(serializedCookie)

module.exports = {
  createCookie,
  clearCookie,
  parseCookie,
}
