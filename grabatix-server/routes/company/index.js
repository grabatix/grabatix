const router = require(`express`).Router()
const passport = require(`passport`)
const { ROLES } = require(`../../config`)
const { utils } = require(`../../auth`)
const { multerUploads } = require(`../../middleware/multer-uploads`)
const { cloudinaryConfig } = require(`../../middleware/cloudinary-config.js`)
const companyController = require(`../../controllers/company`)

/**
 * Function to add routes as middleware on app via app.Router in express
 * @param {Object} app - Initialized Express App with properties
 * @param {Object} app.app - The initialized Express App Object
 * @param {Object} app.urlParsers - two different parsers for various encoding
 * @param {Object} app.urlParsers.extendedUrlParser - exteneded url encoding
 * @param {Object} app.urlParsers.unextendedUrlParser - unexteneded url encoding
 * @param {string} app.version - representing version of this api
 */
module.exports = async ({
  app,
  urlParsers: { unextendedUrlParser, extendedUrlParser },
  version = `v1`,
}) => {
  // router.use(
  //   passport.authenticate(`jwt`, { failureRedirect: `/login` }),
  //   utils.checkIsInRole(ROLES.Admin)
  // );

  // GET, POST, PATCH company details
  router.get(
    `/db/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    (req, res) => {
      res.json(res.company)
    }
  )
  router.get(
    `/qb/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.getCompanyDetail
  )
  router.post(`/create`, extendedUrlParser, companyController.addCompany)
  router.patch(
    `/update/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.updateCompanyDetails
  )

  // UPLOAD CLOUDINARY IMAGE FOR COMPANY
  router.post(
    `/upload/:companyId`,
    cloudinaryConfig,
    multerUploads,
    companyController.getCompany,
    companyController.uploadLogoToCloudinary
  )

  // Quickbooks OAUTH
  router.get(
    `/auth/authUri/:companyId`,
    unextendedUrlParser,
    companyController.authorizeQuickbooks
  )
  router.get(
    `/auth/callback`,
    extendedUrlParser,
    companyController.getCompanyFromState,
    companyController.storeAuthToken
  )
  router.get(
    `/auth/refresh/:companyId`,
    companyController.getCompany,
    companyController.getRefreshToken
  )

  // Quickbooks Items
  router.get(`/items/:companyId`, companyController.company_listitems_get)
  router.get(
    `/item/:itemid/:companyId`,
    companyController.company_itemdetail_get
  )
  router.post(
    `/item/create/:companyId`,
    extendedUrlParser,
    companyController.company_createitem_post
  )
  router.put(
    `/item/update/:itemid/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_updateitem_put
  )

  // Quickbooks Categories
  router.get(
    `/categories/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_listcategories_get
  )
  router.get(
    `/category/:categoryid/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_categorydetail_get
  )
  router.post(
    `/category/create/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_createcategory_post
  )
  router.put(
    `/category/update/:categoryid/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_updatecategory_put
  )

  // Company Employees via Quickbooks
  router.get(
    `/employees/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_listemployees_get
  )
  router.get(
    `/employee/:employeeid/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_employeedetail_get
  )
  router.post(
    `/employee/create/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_createemployee_post
  )
  router.put(
    `/employee/update/:employeeid/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_updateemployee_put
  )

  // Quickbooks Process Payment
  router.post(
    `/payment/:companyId`,
    extendedUrlParser,
    companyController.getCompany,
    companyController.company_processpayment_post
  )

  app.use(`${process.env.BASE_API_URL}/${version}/company`, router)
}
