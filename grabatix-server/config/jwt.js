const JWT = {
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  CSRF_TOKEN_SECRET: process.env.CSRF_TOKEN_SECRET,
}

module.exports = { JWT }
