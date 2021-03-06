const express = require(`express`)
const path = require(`path`)
const helmet = require(`helmet`)
const cookieParser = require(`cookie-parser`)
const compression = require(`compression`)
const cors = require(`cors`)
const session = require(`express-session`)
const morgan = require(`morgan`)
const methodOverride = require(`method-override`)
const { createLogger, transports } = require(`winston`)
const debug = require(`debug`)(`app`)

debug(`Configuring App Logging`)
const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: `app.log`,
      level: `info`,
      options: { flags: `w` },
    }),
    new transports.File({
      filename: `app-errors.log`,
      level: `error`,
      options: { flags: `w` },
    }),
  ],
})
logger.on(`error`, (err) => console.error({ 'Winston Logging Error': err }))

const hpp = require(`hpp`)

const expressApp = (workerId) => {
  if (process.env.NODE_ENV !== `production`) {
    require(`dotenv`).config()
  }

  const app = express()

  debug(`Securing Headers`)
  // use helmetjs to set common secure headers
  app.use(helmet())
  app.use(helmet.referrerPolicy({ policy: `no-referrer-when-downgrade` }))
  app.use(helmet.hidePoweredBy())

  debug(`Stuffing Query Parameters`)
  // prevent DDOS attacks by stuffing Query Parameters
  app.use(hpp())

  debug(`Enabling Method Override`)
  // allow PUT, PATCH, DELETE via _method param
  app.use(methodOverride(`_method`))
  // override with different headers; last one takes precedence
  app.use(methodOverride(`X-HTTP-Method`)) //          Microsoft
  app.use(methodOverride(`X-HTTP-Method-Override`)) // Google/GData
  app.use(methodOverride(`X-Method-Override`)) //      IBM

  debug(`Configuring CORS`)
  /* Reconfigure for Production */
  app.use(cors())

  // Use morgan for logs
  app.use(morgan(`dev`))

  // Specify the port.
  const port = process.env.PORT || 4000

  debug(`Configuring Subdomain Middleware`)
  // ADD Subdomain, if any, to the request object
  app.use((req, res, next) => {
    if (!req.subdomains.length || req.subdomains.slice(-1)[0] === `www`)
      return next()
    // otherwise we have subdomain here
    const subdomain = req.subdomains.slice(-1)[0]
    // keep it
    req.subdomain = subdomain
    next()
  })

  // support gzip
  app.use(compression())

  app.use(cookieParser())

  app.set(`port`, port)

  debug(`Configuring Rate-Limiting Middleware`)
  // set up rate limits for access to backend to prevent DDOS attacks
  const RateLimit = require(`express-rate-limit`)
  const apiLimiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
  app.use(`*`, apiLimiter)

  // Send Static Assets and set up API
  debug(`Configure Static Assets and API`)
  app.use(express.static(path.join(__dirname, `../grabatix-client`, `build`)))
  app.get(`/`, (req, res, next) => {
    res.sendFile(
      path.join(__dirname, `../grabatix-client`, `build`, `index.html`)
    )
  })

  const { router } = require(`./routes/router`)
  router(app)

  // middleware to display session data in console during development and staging only
  if (process.env.NODE_ENV !== `production`) {
    app.use((req, res, next) => {
      console.log(``)
      console.log(`*************REQUEST MIDDLEWARE***************`)
      console.log(`Worker`, workerId)
      console.log({ subdomains: req.subdomains })
      console.log({ 'x-auth-token': req.get(`x-auth-token`) })
      console.log({ 'x-csrf-jwt': req.get(`x-csrf-jwt`) })
      console.log({ company: req.company })
      console.log({ user: req.user })
      console.log({ role: req.user ? req.user.role : `` })
      console.log(`**********************************************`)
      console.log(``)
      next()
    })
  }

  // set up last to handle 404 errors
  app.use(`*`, (req, res, next) => {
    res.statusCode = 404
    res.json({ error: `Not Found` })
  })

  // Set Up Connection to DataStore
  debug(`Configure Database Connection`)
  const { connectToDatabase } = require(`./database/connection`)
  connectToDatabase()

  return app
}

module.exports = expressApp
