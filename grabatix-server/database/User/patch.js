const User = require(`../models/User/index`)

const addCompanyUserRole = async (userId, companyId, role) => {
  const user = await User.findOne({ _id: userId })
  const idx = user.roles.findIndex((role) => role.companyId === companyId)
  if (idx === -1) {
    user.roles.push({ companyId, role })
  } else {
    user.roles[idx] = { companyId, role }
  }
  await user.save()
}

const removeCompanyUserRole = async (userId, companyId, role) => {}

module.exports = { addCompanyUserRole, removeCompanyUserRole }
