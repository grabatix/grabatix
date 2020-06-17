const Company = require(`../models/Company/index`)

const updateTokens = async ({ companyId, tokens }) => {
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(query, { Tokens: tokens }, options)
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

module.exports = { updateTokens, addCompanyInfoFromQBO }
