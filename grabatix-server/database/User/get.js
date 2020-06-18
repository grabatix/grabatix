const User = require('../models/User/index');

const getUserById = async (id) => {
  return await User.findById(id)
};

const getUserByUsername = async (username) => {
  return await User.findOne({ username })
};

module.exports = { getUserById, getUserByUsername };
