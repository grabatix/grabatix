const Company = require('../models/Company/index')

const createCompany = async ({ CompanyIdentifier, Email }) => {
  return new Promise(async (resolve, reject) => {
    const company = await Company.findOne({ "grabatix.CompanyIdentifier": CompanyIdentifier })

    if (company) {
      return reject('Company Identifier is already in use')
    }

    return resolve(
      await Company.create({
        grabatix: {
          CompanyIdentifier,
          Email,
        },
      })
    )
  })
}

module.exports = { createCompany }
