const User = require('../models/User/index');

const getUserById = async (id) => {
  return await User.findById(id)
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email })
};

const getUserByProviderId = async (providerId) => {
  return await User.findOne({ providerId })
};

module.exports = { getUserById, getUserByEmail, getUserByProviderId };
