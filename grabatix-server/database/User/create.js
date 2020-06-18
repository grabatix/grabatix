const User = require(`../models/User/index`)
const { verifyPassword } = require(`../../auth/utils`)

const createUser = async ({ username, password }) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username })

    if (user) {
      return reject(new Error(`Email is already in use`))
    }

    return resolve(
      await User.create({
        username,
        password,
      })
    )
  })
}

const createUserWithRoles = async ({ role, username, password, companyId }) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username })
    if (user) {
      if (password) {
        try {
          const verified = verifyPassword(password, user.password)
          if (verified) {
            const idx = user.roles.findIndex(
              (role) => role.companyId === companyId
            )
            if (idx > -1) {
              user.roles[idx].role = role
            } else {
              user.roles.push({ companyId, role })
            }
            return resolve(await user.save())
          } else {
            return reject(new Error(`Passwords do not match on pre-existing account`))
          }
        } catch (e) {
          return reject(new Error(`Unable to compare passwords`))
        }
      }
    }
    return resolve(
      await User.create({
        username,
        password,
        roles: [
          {
            companyId,
            role,
          },
        ],
      })
    )
  })
}

module.exports = { createUser, createUserWithRoles }
