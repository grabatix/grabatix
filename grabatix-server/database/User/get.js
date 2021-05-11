const User = require(`../models/User/index`)

const getUserById = async (id) => {
  return await User.findById(id)
}

const getUserByUsername = async (username) => {
  return await User.findOne({ username })
}

const getRolesUserById = async (userId) => {
  return await User.findOne({ _id: userId })
    .populate({
      path: `roles.company`,
      model: `Company`,
      select: [`grabatixIdentifier`, `realmId`, `role`],
    })
    .exec()
}

module.exports = { getUserById, getUserByUsername, getRolesUserById }
