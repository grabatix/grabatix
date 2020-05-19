/** @format */

export const adminPaths = {
  registerPath: `/admin/register`,
  accountPath: `/admin/account`,
  editPath: `/admin/account/edit`,
  homePath: `/admin`,
  loginPath: `/admin/login`,
  signupPath: `/admin/signup`,
  reportsPath: `/admin/account/reports`,
  usersPath: `/admin/users`,
  onlineTransactionsPath: `/admin/account/reports/online-transactions`,
  attendantTransactionPath: `/admin/account/reports/attendant-activity`,
}

export const attendantPaths = {
  accountPath: `/attendant/account`,
  editPath: `/attendant/account/edit`,
  homePath: `/attendant`,
  loginPath: `/attendant/login`,
  signupPath: `/attendant/signup`,
  scanPath: `/attendant/scan`,
  recentScansPath: `/attendant/account/recent-scans`,
}

export const consumerPaths = {
  accountPath: `/account`,
  editPath: `/account/edit`,
  homePath: `/`,
  loginPath: `/login`,
  signupPath: `/signup`,
  codesPath: `/account/codes`,
  historyPath: `/account/history`,
  cartPath: `/cart`,
}

const paths = { adminPaths, attendantPaths, consumerPaths }

export default paths
