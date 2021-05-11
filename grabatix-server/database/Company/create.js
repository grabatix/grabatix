const Company = require(`../models/Company/index`)

const createCompany = async ({ grabatixIdentifier, emailAddress }) => {
  return new Promise(async (resolve, reject) => {
    const company = await Company.findOne({
      grabatixIdentifier,
    })

    if (company) {
      return reject(new Error(`Company Identifier is already in use`))
    }

    return resolve(
      await Company.create({
        grabatixIdentifier,
        emailAddress,
      })
    )
  })
}

const createCompanyFromRealmId = async ({
  qid,
  realmId,
  tokens,
  companyName,
  emailAddress,
  isInvited = false,
  invitation = null,
}) => {
  return new Promise(async (resolve, reject) => {
    const company = await Company.findOne({
      realmId,
    })

    if (company) {
      return reject(new Error(`Company exists with realmId is already in use`))
    }

    return resolve(
      await Company.create({
        grabatixIdentifier: qid,
        isQuickbooksAuthorized: true,
        realmId,
        tokens,
        companyName,
        emailAddress,
        isInvited,
        invitation,
      })
    )
  })
}

const createTemporaryCompany = async ({ grabatixIdentifier }) => {
  return new Promise(async (resolve, reject) => {
    const company = await Company.findOne({
      grabatixIdentifier,
    })

    if (company) {
      return reject(
        new Error(`Company with grabatixIdentifier is already in use`)
      )
    }

    return resolve(
      await Company.create({
        grabatixIdentifier,
        isQuickbooksAuthorized: false,
        realmId: ``,
        tokens: [],
      })
    )
  })
}

module.exports = {
  createCompany,
  createCompanyFromRealmId,
  createTemporaryCompany,
}
