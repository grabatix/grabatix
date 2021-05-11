const Company = require(`../models/Company/index`)

const updateTokens = async ({ id, tokens }) => {
  const query = { _id: id }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(query, { tokens }, options)
}

const updateTokensByRealmId = async ({ realmId, tokens }) => {
  const query = { realmId }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(query, { tokens }, options)
}

const updateGrabatixIdentifier = async ({ id, grabatixIdentifier }) => {
  const query = { _id: id }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(query, { grabatixIdentifier }, options)
}

const updateLogo = async ({ companyId, image }) => {
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findByIdAndUpdate(
    query,
    {
      logo: image,
    },
    options
  )
}

const completeRegistration = async ({
  companyId,
  grabatixIdentifier,
  companyName,
  emailAddress,
  invitationId,
  subscription,
}) => {
  const query = { _id: companyId }
  const options = { new: true, upsert: true }
  return Company.findOneAndUpdate(
    query,
    {
      grabatixIdentifier,
      companyName,
      emailAddress,
      isRegistered: true,
      invitation: invitationId,
      isInvited: true,
      subscription,
    },
    options
  )
}

const addCompanyUser = async ({ companyId, userId }) => {
  const query = { _id: companyId }
  const company = await Company.findOne(query)
  const idx = company.users.findIndex((user) => user.id === userId)
  if (idx < 0) {
    company.users.push(userId)
  }
  return company.save()
}

const removeCompanyUser = async ({ realmId, userId }) => {
  const query = { realmId }
  const company = await Company.findOne(query)
  const idx = company.users.findIndex((user) => user.id === userId)
  if (idx > -1) {
    const id = company.users[idx]._id
    company.users.id(id).remove()
  }
  return company.save()
}

const addOrUpdateProduct = async ({ realmId, productData }) => {
  const query = { realmId }
  const company = await Company.findOne(query)
  const idx = company.products.findIndex(
    (product) => product.productId === productData.productId
  )
  let product
  if (idx < 0) {
    product = { ...productData, productOrder: company.products.length }
    company.products.push(productData)
  } else {
    product = company.products[idx]
    Object.keys(productData).map((key) => {
      product[key] = productData.key
    })
  }
  company.markModified(`products`)
  return company.save()
}

const importProducts = async ({ realmId, products }) => {
  const query = { realmId }
  const company = await Company.findOne(query)
  products.forEach((product, index) => {
    company.products.push({
      ...product,
      productOrder: company.products.length + index,
    })
  })
  company.markModified(`products`)
  return company.save()
}

const removeProduct = async ({ realmId, productId }) => {
  const query = { realmId }
  const company = await Company.findOne(query)
  const idx = company.products.findIndex(
    (product) => product.productId === productId
  )
  if (idx > -1) {
    const id = company.products[idx]._id
    company.products.id(id).remove()
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
      tokens: Tokens,
    },
    options
  )
}

module.exports = {
  updateTokens,
  updateTokensByRealmId,
  updateGrabatixIdentifier,
  addCompanyInfoFromQBO,
  addCompanyUser,
  removeCompanyUser,
  updateLogo,
  addOrUpdateProduct,
  importProducts,
  removeProduct,
  completeRegistration,
}
