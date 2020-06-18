const {
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
} = require(`./get`)
const { createCompany } = require(`./create`)
const { addAdminUser, updateTokens, addCompanyInfoFromQBO } = require(`./patch`)

module.exports = {
  createCompany,
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
  updateTokens,
  addCompanyInfoFromQBO,
  addAdminUser,
}
