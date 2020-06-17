const { VERSIONS } = require('../config');
const attendantRoutes = require('./attendant');
const companyRoutes = require('./company');
const customerRoutes = require('./customer');
const userRoutes = require('./user');

const router = (app, urlParsers) => {
  attendantRoutes({ app, urlParsers, version: VERSIONS['attendant'] });
  companyRoutes({ app, urlParsers, version: VERSIONS['company'] });
  customerRoutes({ app, urlParsers, version: VERSIONS['customer'] });
  userRoutes({ app, urlParsers, version: VERSIONS['user'] });
};

module.exports = { router };
