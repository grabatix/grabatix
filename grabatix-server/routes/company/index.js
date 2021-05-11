const router = require(`express`).Router()
const nonJsonRouter = require(`express`).Router()
const { upload, imageStore } = require(`../../middleware/cloudinary-multer`)
const { ROLES } = require(`../../config`)
const { utils } = require(`../../auth`)
const companyController = require(`../../controllers/company`)
const { validateUsernameAndPassword } = require(`../../controllers/user`)
const bodyParser = require(`body-parser`)

/**
 * Function to add routes as middleware on app via app.Router in express
 * @param {Object} app - Initialized Express App with properties
 * @param {Object} app.app - The initialized Express App Object
 * @param {string} app.version - representing version of this api
 */
module.exports = async ({ app, version = `v1` }) => {
  // Image Upload

  nonJsonRouter.post(
    `/upload/:id`,
    upload.single(`image`),
    imageStore.uploadToCloud,
    companyController.uploadToCloudinary
  )
  // Quickbooks OAUTH
  nonJsonRouter.get(
    `/auth/authUri/:companyId`,
    bodyParser.urlencoded({
      extended: false,
    }),
    companyController.authorizeQuickbooks
  )

  app.use(`${process.env.BASE_API_URL}/${version}/company`, nonJsonRouter)

  router.use(bodyParser.json())
  router.use(bodyParser.text())
  router.use(bodyParser.json({ type: `application/*+json` }))
  router.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  router.get(
    `/auth/callback`,
    companyController.getCompanyFromState,
    companyController.storeAuthToken
  )
  router.get(
    `/auth/refresh/:companyId`,
    companyController.getCompany,
    companyController.getRefreshToken
  )
  // GET, POST, PATCH company details
  router.get(`/db/:companyId`, companyController.getCompany, (req, res) => {
    res.json(req.company)
  })
  router.get(
    `/qb/:companyId`,
    companyController.getCompany,
    companyController.getCompanyDetail
  )
  router.post(
    `/create`,
    validateUsernameAndPassword,
    companyController.addCompany
  )
  router.patch(
    `/update/:companyId`,
    companyController.getCompany,
    companyController.updateCompanyDetails
  )

  // Quickbooks Items
  router.get(`/items/:companyId`, companyController.company_listitems_get)
  router.get(
    `/item/:itemid/:companyId`,
    companyController.company_itemdetail_get
  )
  router.post(
    `/item/create/:companyId`,
    companyController.company_createitem_post
  )
  router.patch(
    `/item/update/:itemid/:companyId`,
    companyController.getCompany,
    companyController.company_updateitem_put
  )

  // Quickbooks Categories
  router.get(
    `/categories/:companyId`,
    companyController.getCompany,
    companyController.company_listcategories_get
  )
  router.get(
    `/category/:categoryid/:companyId`,
    companyController.getCompany,
    companyController.company_categorydetail_get
  )
  router.post(
    `/category/create/:companyId`,
    companyController.getCompany,
    companyController.company_createcategory_post
  )
  router.patch(
    `/category/update/:categoryid/:companyId`,
    companyController.getCompany,
    companyController.company_updatecategory_put
  )

  // Company Employees via Quickbooks
  router.get(
    `/employees/:companyId`,
    companyController.getCompany,
    companyController.getEmployees
  )
  router.get(
    `/employee/:employeeid/:companyId`,
    companyController.getCompany,
    companyController.getEmployeeDetail
  )
  router.post(
    `/employee/create/:companyId`,
    companyController.getCompany,
    companyController.createEmployee
  )
  router.patch(
    `/employee/update/:employeeid/:companyId`,
    companyController.getCompany,
    companyController.updateEmployee
  )

  // Quickbooks Process Payment
  router.post(
    `/payment/:companyId`,
    companyController.getCompany,
    companyController.company_processpayment_post
  )

  // get transaction reports
  router.get(
    `/transactions/:companyId`,
    companyController.getCompany,
    companyController.getTransactions
  )

  app.use(`${process.env.BASE_API_URL}/${version}/company`, router)
}
