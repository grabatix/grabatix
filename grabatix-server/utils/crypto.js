const crypto = require(`crypto`)
const { CRYPTO } = require(`../config`)

// https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password_options
// key generation: node -e "console.log(crypto.createHash('sha256').digest('base64').substr(0, 32));"
const defaultAlgorithm = `aes-256-ctr`
const defaultIV = crypto.randomBytes(16)

const encrypt = (text, algorithm, iv) => {
  let cipher
  if (crypto.createCipheriv) {
    cipher = crypto.createCipheriv(
      algorithm ? algorithm : defaultAlgorithm,
      CRYPTO.KEY,
      iv ? iv : defaultIV
    )
  } else {
    crypto = crypto.createCipher(defaultAlgorithm, CRYPTO.KEY)
  }
  let crypted = cipher.update(text, `utf8`, `hex`)
  crypted += cipher.final(`hex`)
  return crypted
}

const decrypt = (text, algorithm, iv) => {
  let decipher
  if (crypto.createDecipheriv) {
    decipher = crypto.createDecipheriv(
      algorithm ? algorithm : defaultAlgorithm,
      CRYPTO.KEY,
      iv ? iv : defaultIV
    )
  } else {
    crypto.createDecipher(defaultAlgorithm, CRYPTO.KEY)
  }
  let dec = decipher.update(text, `hex`, `utf8`)
  dec += decipher.final(`utf8`)
  return dec
}

module.exports = {
  encrypt,
  decrypt,
}
