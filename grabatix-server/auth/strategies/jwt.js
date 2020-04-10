const passport = require('passport')
const passportJWT = require('passport-jwt')
const { to } = require('await-to-js')

const getUserById = require('../../database/user')
const { signToken } = require('../utils')

const JWTStrategy = passportJWT.Strategy

const strategy = () => {
  const strategyOptions = {
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
  }

  const verifyCallback = async (req, jwtPayload, cb) => {
    const [err, user] = await to(getUserById(jwtPayload.data._id))
    if (err) {
        return cb(err)
    }
    req.user = user
    return cb(null, user)
  }

  passport.use(new JWTStrategy(strategyOptions, verifyCallback))
}

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    // TODO
  })
}

module.exports = { strategy, login }