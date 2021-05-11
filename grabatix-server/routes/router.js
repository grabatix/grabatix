const { VERSIONS } = require(`../config`)
const attendantRoutes = require(`./attendant`)
const companyRoutes = require(`./company`)
const customerRoutes = require(`./customer`)
const userRoutes = require(`./user`)

const router = (app) => {
  attendantRoutes({ app, version: VERSIONS[`attendant`] })
  companyRoutes({ app, version: VERSIONS[`company`] })
  customerRoutes({ app, version: VERSIONS[`customer`] })
  userRoutes({ app, version: VERSIONS[`user`] })
}

module.exports = { router }
