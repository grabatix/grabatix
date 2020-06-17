const passport = require(`passport`)
const LocalStrategy = require(`passport-local`).Strategy
const { getUserByEmail } = require(`../../database/User`)
const { verifyPassword } = require(`../utils`)

const strategy = () => {
  const verifyCallback = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: `No User with that email` })
    }
    try {
      if (await verifyPassword(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: `Password incorrect` })
      }
    } catch (e) {
      done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: `email` }, verifyCallback))
}

module.exports = {
  strategy,
}
