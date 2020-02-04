const { model } = require('mongoose');
const CustomerSchema = require('../schema/CustomerSchema')

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;