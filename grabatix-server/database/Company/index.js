const {
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
} = require(`./get`)
const { createCompany } = require(`./create`)
const {
  addAdminUser,
  addAttendantUser,
  updateTokens,
  addCompanyInfoFromQBO,
  updateLogo,
  addProduct,
  removeProduct,
  updateProduct,
} = require(`./patch`)

module.exports = {
  createCompany,
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
  updateTokens,
  addCompanyInfoFromQBO,
  addAdminUser,
  addAttendantUser,
  updateLogo,
  addProduct,
  removeProduct,
  updateProduct,
}
