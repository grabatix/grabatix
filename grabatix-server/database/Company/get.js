const Company = require(`../models/Company/index`)

const getCompanyById = async (id) => {
  return await Company.findById(id)
}

const getCompanyByEmail = async (email) => {
  return await Company.findOne({ email })
}

const getCompanyByCompanyIdentifier = async (CompanyIdentifier) => {
  return await Company.findOne({ CompanyIdentifier })
}

module.exports = {
  getCompanyById,
  getCompanyByEmail,
  getCompanyByCompanyIdentifier,
}
