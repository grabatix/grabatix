const router = require("express").Router();
const asyncMiddleware = require("../utils/async-middleware");
const jwt = require("jsonwebtoken");
const { multerUploads }= require('../../utils/multer-uploads')
const { cloudinaryConfig } = require('../../utils/cloudinary-config.js')
const userController = require("../../controllers/user")

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

    router.post("/login", asyncMiddleware, userController.user_login_post);
    router.post("/signup", asyncMiddleware, userController.user_signup_post);

    app.use(`${process.env.BASE_API_URL}/${version}/user`, router);
}