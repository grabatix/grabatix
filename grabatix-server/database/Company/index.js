const {
  getCompanyByQBORealmId,
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
  getProductsByRealmId,
  getUsersByRealmId,
} = require(`./get`)
const {
  createCompany,
  createCompanyFromRealmId,
  createTemporaryCompany,
} = require(`./create`)
const {
  addCompanyUser,
  removeCompanyUser,
  updateTokens,
  updateTokensByRealmId,
  addCompanyInfoFromQBO,
  updateLogo,
  addOrUpdateProduct,
  removeProduct,
  updateGrabatixIdentifier,
  completeRegistration,
  importProducts,
} = require(`./patch`)

module.exports = {
  createCompany,
  createCompanyFromRealmId,
  createTemporaryCompany,
  getCompanyByQBORealmId,
  getCompanyByCompanyIdentifier,
  getCompanyByEmail,
  getCompanyById,
  getProductsByRealmId,
  getUsersByRealmId,
  updateTokens,
  updateTokensByRealmId,
  addCompanyInfoFromQBO,
  addCompanyUser,
  removeCompanyUser,
  updateLogo,
  addOrUpdateProduct,
  importProducts,
  removeProduct,
  updateGrabatixIdentifier,
  completeRegistration,
}
