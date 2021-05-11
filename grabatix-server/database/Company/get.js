const Company = require(`../models/Company/index`)

/**
 *
 * @param {string} id - mongodb_id
 */
const getCompanyById = async (id) => {
  return await Company.findById(id)
}

/**
 *
 * @param {string} emailAddress - unique email login
 */
const getCompanyByEmail = async (emailAddress) => {
  return await Company.findOne({ emailAddress })
}

/**
 *
 * @param {string} grabatixIdentifier - unique app-level identififer
 */
const getCompanyByCompanyIdentifier = async (grabatixIdentifier) => {
  return await Company.findOne({ grabatixIdentifier })
}

/**
 *
 * @param {string} realmId - QBO realmID
 */
const getCompanyByQBORealmId = async (realmId) => {
  return await Company.findOne({ realmId })
}

const getProductsByRealmId = async (realmId) => {
  return await Company.findOne({ realmId }).select(`products`)
}

const getUsersByRealmId = async (realmId) => {
  return await Company.findOne({ realmId })
    .populate({
      path: `users`,
      populate: {
        path: `roles`,
        populate: {
          path: `companyId`,
          model: `Company`,
          select: `realmId -_id`,
          match: { realmId: { $eq: realmId } },
        },
        select: `-_id`,
      },
      select: `username roles`,
    })
    .exec()
}

module.exports = {
  getCompanyById,
  getCompanyByEmail,
  getCompanyByCompanyIdentifier,
  getCompanyByQBORealmId,
  getProductsByRealmId,
  getUsersByRealmId,
}
