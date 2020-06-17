const User = require(`../models/User/index`)

const createUser = async ({ username, password }) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username })

    if (user) {
      return reject(`Email is already in use`)
    }

    return resolve(
      await User.create({
        username,
        password,
      })
    )
  })
}

module.exports = { createUser }
