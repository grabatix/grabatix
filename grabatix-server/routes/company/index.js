const router = require("express").Router();
const asyncMiddleware = require("../../utils/async-middleware");
const jwt = require("jsonwebtoken");
const { multerUploads }= require('../../utils/multer-uploads')
const { cloudinaryConfig } = require('../../utils/cloudinary-config.js')
const companyController = require("../../controllers/company")

/**
 * Function to add routes as middleware on app via app.Router in express
 * @param {Object} app - Initialized Express App with properties
 * @param {Object} app.app - The initialized Express App Object
 * @param {Object} app.urlParsers - two different parsers for various encoding
 * @param {Object} app.urlParsers.extendedUrlParser - exteneded url encoding
 * @param {Object} app.urlParsers.unextendedUrlParser - unexteneded url encoding
 * @param {string} app.version - representing version of this api
 */
module.exports = async ({app, urlParsers: { unextendedUrlParser, extendedUrlParser }, version = "v1"}) => {
    // GET, POST, PATCH company details
    router.get("/:companyid/info", companyController.company_detail_get);
    router.post("/create", extendedUrlParser, companyController.company_detail_post);
    router.patch("/:companyid/update", extendedUrlParser, companyController.company_detail_patch);

    // UPLOAD CLOUDINARY IMAGE FOR COMPANY
    router.post("/:companyid/upload", cloudinaryConfig, multerUploads, asyncMiddleware, companyController.company_createupload_post);

    // Quickbooks OAUTH
    router.get("/:companyid/auth/authUri", unextendedUrlParser, companyController.company_auth_get);
    router.get("/auth/callback", extendedUrlParser, companyController.company_authcallback_get);
    router.get("/:companyid/auth/refresh", asyncMiddleware, companyController.company_refreshtoken_get);

    // Quickbooks Items
    router.get("/:companyid/items", companyController.company_listitems_get);
    router.get("/:companyid/item/:itemid", companyController.company_itemdetail_get);
    router.post("/:companyid/item/create", extendedUrlParser, companyController.company_createitem_post);
    router.put("/:companyid/item/update/:itemid", extendedUrlParser, companyController.company_updateitem_put);

    // Quickbooks Categories
    router.get("/:companyid/categories", companyController.company_listcategories_get);
    router.get("/:companyid/category/:categoryid", companyController.company_categorydetail_get);
    router.post("/:companyid/category/create", extendedUrlParser, companyController.company_createcategory_post);
    router.put("/:companyid/category/update/:categoryid", extendedUrlParser, companyController.company_updatecategory_put);

    // Company Employees via Quickbooks
    router.get("/:companyid/employees", companyController.company_listemployees_get);
    router.get("/:companyid/employee/:employeeid", companyController.company_employeedetail_get);
    router.post("/:companyid/employee/create", extendedUrlParser, companyController.company_createemployee_post);
    router.put("/:companyid/employee/update/:employeeid", extendedUrlParser, companyController.company_updateemployee_put);

    // Quickbooks Process Payment
    router.post("/:companyid/payment", extendedUrlParser, asyncMiddleware, companyController.company_processpayment_post);

    app.use(`${process.env.BASE_API_URL}/${version}/company`, router);
}