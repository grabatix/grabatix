const OAuthClient = require(`intuit-oauth`)
const { to } = require(`await-to-js`)
const {
  createCompany,
  getCompanyById,
  updateTokens,
  addCompanyInfoFromQBO,
  addAdminUser,
  updateLogo,
} = require(`../../database/Company`)
const {
  getTransactionsByCompanyId
} = require(`../../database/Transaction`)
const { createUserWithRoles } = require(`../../database/User`)
const { hashPassword } = require(`../../auth/utils`)
const { qboAuth } = require(`../../utils/quickbooks-helpers`)
const { ROLES } = require(`../../config`)

// GET details of existing company.
exports.getCompanyDetail = async (req, res, next) => {
  let company
  const id = req.params.companyId
  if (!id) {
    console.error(`id param missing.`)
    res
      .status(400)
      .json({ error: { message: `Company Id Missing`, statusCode: 400 } })
  }
  try {
    company = await qboAuth.getCompanyInfo(id)
    if (company == null) {
      return res.status(404).json({ message: `Cannot Find Company` })
    }
  } catch (error) {
    return qboAuth.handleQBError(res, error)
  }
  req.company = company
  next()
}

exports.getCompany = async function (req, res, next) {
  const id = req.params.companyId
  let company
  try {
    company = await getCompanyById(id)
    if (company == null) {
      return res.status(404).json({ message: `Cannot Find Company` })
    }
  } catch (err) {
    return res.status(500).json({ error: { message: `DB Error`, data: err } })
  }

  req.company = company
  next()
}

// Create New Company.
exports.addCompany = async function (req, res, next) {
  const { username, password, confirmPassword, identifier } = req.body
  let company
  try {
    company = await createCompany({
      CompanyIdentifier: identifier,
      Email: username,
    })
  } catch (err) {
    return res
      .status(
        err.message === `Company Identifier is already in use` ? 400 : 500
      )
      .json({ error: { message: err.message } })
  }

  const [hashError, hash] = await to(hashPassword(password))

  if (hashError) {
    return res
      .status(500)
      .json({ success: false, message: `Server bcrypt Error`, data: hashError })
  }

  let user
  try {
    user = await createUserWithRoles({
      role: ROLES.ADMIN,
      username,
      password: hash,
      companyId: company.id,
    })
  } catch (err) {
    let status
    switch (err.message) {
      case `Passwords do not match on pre-existing account`:
      case `Unable to compare passwords`:
        status = 400
        break
      default:
        status = 500
        break
    }
    return res.status(status).json({ error: { message: err.message } })
  }

  try {
    await addAdminUser({ companyId: company.id, userId: user.id })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { message: `DB Error`, data: err } })
  }

  res.status(201).json({ company: company.id, user: user.id })
}

const validUpdateTypes = [`grabatix_identity`, `products`, `employees`, `url`]
// update fields of existing company
exports.updateCompanyDetails = async function (req, res, next) {
  const companyId = req.company.id
  const type = req.query.type
  if (!validUpdateTypes.includes[type]) {
    return res.status(400).json({ message: `Invalid Update Type` })
  }
  const updates = req.body.updates
  res.send(`NOT IMPLEMENTED: companydetail: ` + req.params.companyid + ` PATCH`)
}

// Upload companycreate form on POST.
exports.uploadToCloudinary = async (req, res) => {
  if (!req.image) {
    return res
      .status(400)
      .json({ message: `Image is Missing from the Request ` })
  }
  let company
  try {
    company = await updateLogo({ companyId: req.params.id, image: req.image })
    if (company == null) {
      return res.status(404).json({ message: `Cannot Find Company` })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { message: `DB Error`, data: err } })
  }
  res.status(201).json({ company: company.id, image: req.image.secure_url })
}

// Handle companyprocesspayment form on POST.
exports.company_processpayment_post = async function (req, res, next) {
  res.send(`NOT IMPLEMENTED: companyprocesspayment POST`)
}

// Handle companyoauth on GET.
exports.authorizeQuickbooks = (req, res) => {
  const companyId = req.params.companyId
  const authUri = qboAuth.oAuthClient.authorizeUri({
    scope: [
      OAuthClient.scopes.Accounting,
      OAuthClient.scopes.Payment,
      OAuthClient.scopes.Profile,
      OAuthClient.scopes.OpenId,
    ],
    state: companyId,
  })
  res.redirect(authUri)
}

exports.getCompanyFromState = async (req, res, next) => {
  const id = req.query.state
  if (!id) {
    res.status(403).json({ message: `Invalid Authorization Attempt` })
  }
  let company
  try {
    company = await getCompanyById(id)
    if (company == null) {
      return res
        .status(404)
        .json({ message: `Cannot Find Company. Please Create Account.` })
    }
  } catch (err) {
    return res.status(500).json({ error: { message: `DB Error`, data: err } })
  }

  req.company = company
  next()
}

// Handle companyauthcallback on GET.
exports.storeAuthToken = async (req, res, next) => {
  let company = req.company

  try {
    const authResponse = await qboAuth.oAuthClient.createToken(req.url)
    const oauth2_token_json = authResponse.getJson()
    // GET COMPANY INFO
    qboAuth.updateRealmId(qboAuth.oAuthClient.getToken().realmId)

    try {
      const companyInfo = await qboAuth.getCompanyInfo()
      try {
        company = await addCompanyInfoFromQBO({
          companyId: company.id,
          CompanyInfo: companyInfo.CompanyInfo,
          Tokens: oauth2_token_json,
        })
        if (company == null) {
          return res
            .status(404)
            .json({ message: `Cannot Find Company. Please Create Account.` })
        }
      } catch (err) {
        return res
          .status(500)
          .json({ error: { message: `DB Error`, data: err } })
      }

      res.json({
        companyId: company.id,
        refreshToken: oauth2_token_json.refresh_token,
      })
    } catch (error) {
      throw new Error(error)
    }
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

// Handle companyrefreshtoken on POST.
exports.getRefreshToken = async (req, res) => {
  const companyId = req.params.companyId
  try {
    const authResponse = await qboAuth.oAuthClient.refresh()
    const oauth2_token_json = authResponse.getJson()
    let company
    try {
      company = await updateTokens({
        companyId,
        tokens: oauth2_token_json,
      })
      if (company == null) {
        return res
          .status(404)
          .json({ message: `Cannot Find Company. Please Create Account.` })
      }
    } catch (err) {
      return res.status(500).json({ error: { message: `DB Error`, data: err } })
    }
    res.json({ companyId, refreshToken: oauth2_token_json.refresh_token })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.company_listitems_get = async (req, res) => {
  const { companyid } = req.params

  // TODO: Use DB or object in memory? Decide Y or N?

  try {
    const query = `Select * from Item`
    const items = await qboAuth.queryQuickbooks(query)

    res.json({ items })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.company_itemdetail_get = async (req, res) => {
  const { companyid, itemid } = req.params

  // TODO: Validate itemId
  // TODO: Use DB or object in memory? Decide Y or N?

  try {
    const item = await qboAuth.getItemDetail(itemid)

    res.json({ item })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.company_createitem_post = async (req, res) => {
  res.send(`NOT IMPLEMENTED: createitem: ` + req.params.companyid + ` POST`)
}

exports.company_updateitem_put = async (req, res) => {
  res.send(
    `NOT IMPLEMENTED: updateitem: ` +
      req.params.companyid +
      ` PUT ` +
      req.params.itemid
  )
}

exports.company_listcategories_get = async (req, res) => {
  const { companyid } = req.params
  try {
    const query = `Select * from Item where Type='Category'`
    const categories = await qboAuth.queryQuickbooks(query)

    // TODO: Store Data in DB

    res.json({ categories })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.company_categorydetail_get = async (req, res) => {
  const { companyid, categoryid } = req.params

  // TODO: Validate categoryid
  // TODO: Use DB or object in memory? Decide Y or N?

  try {
    const category = await qboAuth.getItemDetail(categoryid)
    res.json({ category })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.company_createcategory_post = async (req, res) => {
  res.send(`NOT IMPLEMENTED: createcategory: ` + req.params.companyid + ` POST`)
}

exports.company_updatecategory_put = async (req, res) => {
  res.send(
    `NOT IMPLEMENTED: updatecategory: ` +
      req.params.companyid +
      ` PUT ` +
      req.params.categoryid
  )
}

exports.getEmployees = async (req, res) => {
  const { companyid } = req.params
  try {
    const query = `Select * from Employee`
    const employees = await qboAuth.queryQuickbooks(query)

    // TODO: Store Data in DB

    res.json({ employees })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.getEmployeeDetail = async (req, res) => {
  const { companyid, employeeid } = req.params

  // TODO: Validate employeeid
  // TODO: Use DB or object in memory? Decide Y or N?

  try {
    const employee = await qboAuth.getEmployeeDetail(employeeid)
    res.json({ employee })
  } catch (error) {
    qboAuth.handleQBError(res, error)
  }
}

exports.createEmployee = async (req, res) => {
  res.send(`NOT IMPLEMENTED: createemployee: ` + req.params.companyid + ` POST`)
}

exports.updateEmployee = async (req, res) => {
  res.send(
    `NOT IMPLEMENTED: updateemployee: ` +
      req.params.companyid +
      ` PUT ` +
      req.params.employeeid
  )
}

exports.getTransactions = async (req, res) => {
  const { companyid } = req.params
  try {
    const transactions = await getTransactionsByCompanyId(companyid)
    res.json({ transactions })
  } catch (err) {
    return res.status(500).json({ error: { message: `DB Error`, data: err } })
  }
}
