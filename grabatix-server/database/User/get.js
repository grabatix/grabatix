const User = require('../models/User/index')

const getUserById = async (id) => {
  return await User.findById(id).exec()
}

const getUserByEmail = async (email) => {
  return await User.findOne({ email }).exec();
}

const getUserByProviderId = async (providerId) => {
  return await User.findOne({ providerId }).exec()
}

module.exports = { getUserById, getUserByEmail, getUserByProviderId }