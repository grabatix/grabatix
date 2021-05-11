const { getUserById, getUserByUsername, getRolesUserById } = require(`./get`)
const { createUser, createUserWithRole } = require(`./create`)
const { addCompanyUserRole, removeCompanyUserRole } = require(`./patch`)

module.exports = {
  getUserById,
  getUserByUsername,
  getRolesUserById,
  createUser,
  createUserWithRole,
  addCompanyUserRole,
  removeCompanyUserRole,
}
