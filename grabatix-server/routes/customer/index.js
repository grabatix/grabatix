const router = require("express").Router();
const asyncMiddleware = require("../../utils/async-middleware");
const passport = require("passport");
const { ROLES } = require('../../utils')
const { utils } = require('../../auth')
const customerController = require("../../controllers/customer")

/**
 * Function to add routes as middleware on app via app.Router in express
 * @param {Object} app - Initialized Express App with properties
 * @param {Object} app.app - The initialized Express App Object
 * @param {Object} app.urlParsers - two different parsers for various encoding
 * @param {Object} app.urlParsers.extendedUrlParser - exteneded url encoding
 * @param {Object} app.urlParsers.unextendedUrlParser - unexteneded url encoding
 * @param {string} app.version - representing version of this api
 */
module.exports = async ({app, urlParsers, version = "v1"}) => {

    router.use(passport.authenticate('jwt', { failureRedirect: '/login' }), utils.checkIsInRole(ROLES.Customer))

    app.use(`${process.env.BASE_API_URL}/${version}/customer`, router);
}