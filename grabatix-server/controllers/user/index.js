const { to } = require(`await-to-js`)
const { createUser, getUserByEmail } = require(`../../database/User`)
const { hashPassword } = require(`../../auth/utils`)

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body
  const [err, user] = await to(getUserByEmail(email))

  const authenticationError = () => {
    return res
      .status(500)
      .json({ success: false, data: `Authentication error!` })
  }

  res.json({ messsage: `login user not implemented` })
}

exports.createUser = async (req, res, next) => {
  const { username, password } = req.body

  const pwReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_])[A-z0-9#?!@$%^&*-_]{8,}$/
  const unReg = /\b\w+\@\w+\.\w+(?:\.\w+)?\b/

  if (!unReg.test(username)) {
    return res.status(400).json({
      success: false,
      message: `Username must be a unique and valid email address.`,
    })
  }

  if (!pwReg.test(password)) {
    return res.status(400).json({
      success: false,
      message: `Password must be at least 8 characters in length include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character (ie. #?!@$%^&*-_).`,
    })
  }

  const [hashError, hash] = await to(hashPassword(password))

  if (hashError) {
    return res
      .status(500)
      .json({ success: false, message: `Server bcrypt Error`, data: hashError })
  }

  const [createdError, user] = await to(
    createUser({
      username,
      password: hash,
    })
  )

  if (createdError) {
    return res
      .status(500)
      .json({ success: false, message: `DB Error`, data: createdError })
  }

  res.user = user
  res.status(201).json({ user })
}
