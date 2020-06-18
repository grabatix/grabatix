const router = require(`express`).Router()
const userController = require(`../../controllers/user`)

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
  urlParsers: { extendedUrlParser },
  version = `v1`,
}) => {
  router.use(extendedUrlParser)

  router.post(`/login`, userController.loginUser)
  router.post(
    `/signup`,
    userController.validateUsernameAndPassword,
    userController.createUser
  )

  app.use(`${process.env.BASE_API_URL}/${version}/user`, router)
}
