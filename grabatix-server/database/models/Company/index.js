const { model } = require(`mongoose`)
const CompanySchema = require(`../../schema/CompanySchema`)

const Company = model(`Company`, CompanySchema)

module.exports = Company
