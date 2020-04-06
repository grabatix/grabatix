const router = require("express").Router();
const asyncMiddleware = require("../utils/async-middleware");
const jwt = require("jsonwebtoken");
const { multerUploads }= require('../utils/multer-uploads')
const { cloudinaryConfig } = require('../utils/cloudinary-config.js')
const company_controller = require("../controllers/company-controller")

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
    router.get("/:companyid/list", company_controller.company_detail_get);
    router.post("/create", extendedUrlParser, company_controller.company_detail_post);
    router.patch("/:companyid/update", extendedUrlParser, company_controller.company_detail_patch);

    // UPLOAD CLOUDINARY IMAGE FOR COMPANY
    router.post("/:companyid/upload", cloudinaryConfig, multerUploads, asyncMiddleware, company_controller.company_createupload_post);

    // Quickbooks OAUTH
    router.get("/:companyid/auth/authUri", unextendedUrlParser, company_controller.company_auth_get);
    router.get("/auth/callback", extendedUrlParser, company_controller.company_authcallback_get);
    router.get("/:companyid/auth/refresh", asyncMiddleware, company_controller.company_refreshtoken_get);

    // Quickbooks Items
    router.get("/:companyid/items", company_controller.company_listitems_get);
    router.get("/:companyid/item/:itemid", company_controller.company_itemdetail_get);
    router.post("/:companyid/item/create", extendedUrlParser, company_controller.company_createitem_post);
    router.put("/:companyid/item/update/:itemid", extendedUrlParser, company_controller.company_updateitem_put);

    // Quickbooks Categories
    router.get("/:companyid/categories", company_controller.company_listcategories_get);
    router.get("/:companyid/category/:categoryid", company_controller.company_categorydetail_get);
    router.post("/:companyid/category/create", extendedUrlParser, company_controller.company_createcategory_post);
    router.put("/:companyid/category/update/:categoryid", extendedUrlParser, company_controller.company_updatecategory_put);

    // Company Employees via Quickbooks
    router.get("/:companyid/employees", company_controller.company_listemployees_get);
    router.get("/:companyid/employee/:employeeid", company_controller.company_employeedetail_get);
    router.post("/:companyid/employee/create", extendedUrlParser, company_controller.company_createemployee_post);
    router.put("/:companyid/employee/update/:employeeid", extendedUrlParser, company_controller.company_updateemployee_put);

    // Quickbooks Process Payment
    router.post("/:companyid/payment", extendedUrlParser, asyncMiddleware, company_controller.company_processpayment_post);

    app.use(`/api/${version}/company`, router);
}