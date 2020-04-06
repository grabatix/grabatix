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
    router.get("/:id", company_controller.company_detail_get);
    router.post("/:id", company_controller.company_detail_post);
    router.patch("/:id", company_controller.company_detail_patch);

    // UPLOAD CLOUDINARY IMAGE FOR COMPANY
    router.post("/:id/upload", cloudinaryConfig, multerUploads, asyncMiddleware, company_controller.company_createupload_post);

    // Quickbooks OAUTH
    router.get("/:id/auth/authUri", unextendedUrlParser, company_controller.company_auth_get);
    router.get("/auth/callback", extendedUrlParser, company_controller.company_authcallback_get);
    router.get("/auth/refreshAccessToken", asyncMiddleware, company_controller.company_refreshtoken_get);

    router.post("/:id/payment", asyncMiddleware, company_controller.company_processpayment_post);

    app.use(`/api/${version}/company`, router);
}