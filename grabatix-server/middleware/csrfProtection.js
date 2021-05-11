const jwtCSRF = require(`./jwt-csrf`)
const crypto = require(`crypto`)

// borrowed and updated jwt-csrf code from https://github.com/krakenjs/jwt-csrf
const secret = crypto
  .createHash(`sha256`)
  .update(String(process.env.JWT_SECRET))
  .digest(`base64`)
  .substr(0, 32)

const getUserToken = (req) => {
  const xToken = req.get(`x-auth-token`)
  const token =
    xToken && xToken.includes(`Token `) ? xToken.split(` `)[1] : null

  return token
}

const csrfProtection = jwtCSRF.middleware({
  csrfDriver: `AUTHED_TOKEN`,
  secret,
  expiresInMinutes: 480,
  excludeUrls: [/^.*(login|signup)$/i],
  getUserToken,
})

module.exports = csrfProtection
