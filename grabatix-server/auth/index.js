const utils = require('./utils');
const strategies = require('./strategies');

const pipe = (...functions) => (args) =>
  functions.reduce((arg, fn) => fn(arg), args);

const initialiseAuthentication = (app) => {
  utils.setup();

  pipe(strategies.JWTStrategy, strategies.LocalStrategy)(app);
};

module.exports = { utils, initialiseAuthentication, strategies };
