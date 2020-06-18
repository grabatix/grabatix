const Company = require(`../models/Company/index`)

const updateTokens = async ({ companyId, tokens }) => {
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(query, { Tokens: tokens }, options)
}

const addAdminUser = async ({ companyId, userId }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const idx = company.grabatix.adminUsers.findIndex((user) => user.id === userId)
  if (idx < 0) {
    company.grabatix.adminUsers.push(userId)
  }
  return company.save()
}

const addCompanyInfoFromQBO = async ({ companyId, CompanyInfo, Tokens }) => {
  const {
    CompanyName,
    CompanyAddr,
    CustomerCommunicationAddr,
    PrimaryPhone,
    Email,
    WebAddr,
    Id,
    SyncToken,
  } = CompanyInfo
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(
    query,
    {
      CompanyName,
      CompanyAddr,
      CustomerCommunicationAddr,
      PrimaryPhone,
      Email,
      WebAddr,
      Id,
      SyncToken,
      Tokens,
    },
    options
  )
}

module.exports = { updateTokens, addCompanyInfoFromQBO, addAdminUser }
