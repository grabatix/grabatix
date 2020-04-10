const User = require('./index.js')

const getUserById = async (id) => {
  return await User.findById(id).exec()
}

module.exports = getUserById