const passport =require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../database/models/User')

const setup = () => {
  passport.serializeUser((user, done) => done(null, user._id))

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  })
}

const signToken = user => {
    return jwt.sign({data:user}, process.env.JWT_SECRET, { expiresIn: "8h" })
}

const hashPassword = async password => {
    if (!password) {
        throw new Error('Password was not provided')
    }
    const salt = await bcrypt.getSalt(10)
    return await bcrypt.hash(password, salt)
}

const verifyPassword = async (candidate, actual) => {
    return await bcrypt.compare(candidate, actual)
}

module.exports = { setup, signToken, hashPassword, verifyPassword }