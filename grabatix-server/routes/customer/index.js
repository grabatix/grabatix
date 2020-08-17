const router = require(`express`).Router()
const asyncMiddleware = require(`../../middleware/async-middleware`)
const { ROLES } = require(`../../config`)
const { utils } = require(`../../auth`)
const customerController = require(`../../controllers/customer`)
const bodyParser = require(`body-parser`)

/**
 * Function to add routes as middleware on app via app.Router in express
 * @param {Object} app - Initialized Express App with properties
 * @param {Object} app.app - The initialized Express App Object
 * @param {string} app.version - representing version of this api
 */
module.exports = async ({ app, version = `v1` }) => {
  // ADD routes here who don't need bodyparser

  router.use(bodyParser.json())
  router.use(bodyParser.text())
  router.use(bodyParser.json({ type: `application/*+json` }))
  router.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(`${process.env.BASE_API_URL}/${version}/customer`, router)
}
