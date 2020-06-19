const {
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
} = require(`./get`)
const { createCompany } = require(`./create`)
const {
  addAdminUser,
  updateTokens,
  addCompanyInfoFromQBO,
  updateLogo,
} = require(`./patch`)

module.exports = {
  createCompany,
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
  updateTokens,
  addCompanyInfoFromQBO,
  addAdminUser,
  updateLogo,
}
