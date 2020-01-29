const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");
const morgan = require("morgan");
const upload = multer();
const methodOverride = require("method-override");
const { createLogger, transports } = require('winston');
const debug = require('debug')('app');

debug('Configuring App Logging');
const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'app.log',
      level: 'info',
      options: { flags: 'w' }
    }),
    new transports.File({
      filename: 'app-errors.log',
      level: 'error',
      options: { flags: 'w' }
    })
  ]
});
logger.on('error', (err) => console.error({"Winston Logging Error": err}));

const hpp = require("hpp");

const expressApp = workerId => {
  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

  const app = express();

  debug('Securing Headers');
  // use helmetjs to set common secure headers
  app.use(helmet());
  app.use(helmet.referrerPolicy({ policy: "no-referrer-when-downgrade" }));
  app.use(helmet.hidePoweredBy());

  debug("Stuffing Query Parameters")
  // prevent DDOS attacks by stuffing Query Parameters
  app.use(hpp());

  debug("Enabling Method Override")
  //allow PUT, PATCH, DELETE via _method param
  app.use(methodOverride("_method"));
  // override with different headers; last one takes precedence
  app.use(methodOverride("X-HTTP-Method")); //          Microsoft
  app.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
  app.use(methodOverride("X-Method-Override")); //      IBM

  debug("Configuring CORS")
  /* Reconfigure for Production */
  app.use(cors());

  // Use morgan for logs
  app.use(morgan("dev"));

  // Specify the port.
  const port = process.env.PORT || 8080;

  debug("Configuring Subdomain Middleware")
  // ADD Subdomain, if any, to the request object
  app.use((req, res, next) => {
    if (!req.subdomains.length || req.subdomains.slice(-1)[0] === "www")
      return next();
    // otherwise we have subdomain here
    const subdomain = req.subdomains.slice(-1)[0];
    // keep it
    req.subdomain = subdomain;
    next();
  });

  //support gzip
  app.use(compression());

  //body parser for routes our app
  app.use(bodyParser.json());
  // parsing application/json
  const extendedUrlParser = bodyParser.urlencoded({
    extended: true
  });
  const unextendedUrlParser = bodyParser.urlencoded({ extended: false });
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/vnd.api+json" }));

  app.use(cookieParser());

  debug("Configuring CSRF Middleware")
  // send csrf cookies
  const csrfProtection = require('./utils/csrfProtection')
  app.use(csrfProtection);

  // for parsing multipart/form-data
  app.use(upload.array());

  //middleware to display session data in console during development and staging only
  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      console.log("");
      console.log("*************REQUEST MIDDLEWARE***************");
      console.log("Worker", workerId);
      console.log({ subdomains: req.subdomains });
      console.log({'x-auth-token': req.get("x-auth-token")})
      console.log({'x-csrf-jwt': req.get('x-csrf-jwt')})
      console.log("**********************************************");
      console.log("");
      next();
    });
  }

  app.set("port", port);

  debug("Configuring Rate-Limiting Middleware")
  // set up rate limits for access to backend to prevent DDOS attacks
  const RateLimit = require("express-rate-limit");
  const apiLimiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });
  app.use("*", apiLimiter);

  app.get("/", (req, res, next) => {
    res.send(`Hello World! You have entered grabatix universe ${workerId}.`);
  });

  // debug("Configuring MongoDB Connection and Controllers")
  // connect to DB and make connection available to Data Models

  // Listen on port 3000 or assigned port

  return app;
};

module.exports = expressApp;
