const Company = require(`../models/Company/index`)

const updateTokens = async ({ companyId, tokens }) => {
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(query, { Tokens: tokens }, options)
}

const updateLogo = async ({ companyId, image }) => {
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findByIdAndUpdate(
    query,
    {
      Logo: image,
    },
    options
  )
}

const addAdminUser = async ({ companyId, userId }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const idx = company.grabatix.adminUsers.findIndex(
    (user) => user.id === userId
  )
  if (idx < 0) {
    company.grabatix.adminUsers.push(userId)
  }
  return company.save()
}

const addAttendantUser = async ({ companyId, userId }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const idx = company.grabatix.attendantUsers.id(
    (user) => user.id === userId
  )
  if (idx < 0) {
    company.grabatix.attendantUsers.push(userId)
  }
  return company.save()
}

const addProduct = async ({ companyId, productData }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const idx = company.products.findIndex(
    (product) => product.id === productData.id
  )
  if (idx < 0) {
    company.products.push(productData)
  }
  return company.save()
}

const removeProduct = async ({ companyId, productId }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const idx = company.products.findIndex(
    (product) => product.id === productId
  )
  if (idx > -1) {
    company.products.id(productId).remove()
  }
  return company.save()
}

const updateProduct = async ({ companyId, productData }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const product = company.products.id(productData.id)
  if (product.length) {
    Object.keys(productData).map(key=> {
      product[key] = productData.key
    })
    return company.save()
  }
  return
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
      tokens: Tokens,
    },
    options
  )
}

module.exports = {
  updateTokens,
  addCompanyInfoFromQBO,
  addAdminUser,
  addAttendantUser,
  updateLogo,
  addProduct,
  removeProduct,
  updateProduct,
}
