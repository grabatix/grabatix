const { to } = require(`await-to-js`)
const { createUser, getUserByUsername } = require(`../../database/User`)
const { hashPassword, verifyPassword } = require(`../../auth/utils`)
const { REGX } = require(`../../config`)

const validUsername = (username) => REGX.username.test(username)
const validPassword = (password) => REGX.password.test(password)

exports.validateUsernameAndPassword = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body
  const errors = {}
  if (!validUsername(username)) {
    errors.username = `Username must be a valid email address.`
  }
  if (!validPassword(password)) {
    errors.password = `Password must be at least 8 characters in length include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character (ie. #?!@$%^&*-_).`
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = `Password and confirmPassword must match.`
  }
  if (Object.keys(errors).length) {
    res
      .status(400)
      .json({ success: false, message: `Errors on Form`, data: errors })
  }
  next()
}

const authenticationError = (msg) => {
  return res
    .status(500)
    .json({ success: false, data: msg })
}

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body
  if (!validUsername(username) || !validPassword(password)) {
    return res
      .status(400)
      .json({ success: false, message: `Invalid credentials.` })
  }
  const [err, user] = await to(getUserByUsername(username))

  if (err) {
    return authenticationError(`Authentication error!`)
  }

  const [ verificationError, verified ] = await to(verifyPassword(password, user.password))

  if (verificationError) {
    return authenticationError(`Username and Password do not match!`)
  }

  res.json({ user: { id: user._id, username: user.username, roles: user.roles } })
}

exports.createUser = async (req, res, next) => {
  const { username, password } = req.body

  const [hashError, hash] = await to(hashPassword(password))

  if (hashError) {
    return res
      .status(500)
      .json({ success: false, message: `Server bcrypt Error`, data: hashError })
  }

  let user
  try {
    user = await createUser({
      username,
      password: hash,
    })
  } catch (err) {
    return res
      .status(err.message === "Email is already in use" ? 400 : 500)
      .json({ success: false, message: err.message })
  }

  res.user = user
  res.status(201).json({ user })
}
