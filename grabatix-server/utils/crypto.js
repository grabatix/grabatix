'use strict';

const crypto = require('crypto');

// https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password_options
const defaultAlgorithm = 'aes-256-ctr';
const defaultIV = crypto.randomBytes(16);

const encrypt = (key, text, algorithm, iv) => {
  let cipher;
  if (crypto.createCipheriv) {
    cipher = crypto.createCipheriv(
      algorithm ? algorithm : defaultAlgorithm,
      key,
      iv ? iv : defaultIV
    );
  } else {
    crypto = crypto.createCipher(defaultAlgorithm, key);
  }
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (key, text, algorithm, iv) => {
  let decipher;
  if (crypto.createDecipheriv) {
    decipher = crypto.createDecipheriv(
      algorithm ? algorithm : defaultAlgorithm,
      key,
      iv ? iv : defaultIV
    );
  } else {
    crypto.createDecipher(defaultAlgorithm, key);
  }
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = {
  encrypt,
  decrypt,
};
