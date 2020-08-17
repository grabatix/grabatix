const Transaction = require('../models/Transaction/index')

const getTransactionById = async (id) => {
  return await Transaction.findById(id)
}

const getTransactionsByUserId = async (userId) => {
  return await Transaction.find({ user: userId }).populate(`company`)
}

const getTransactionsByCompanyId = async (companyId) => {
  return await Transaction.find({ company: companyId })
}

module.exports = {
  getTransactionById,
  getTransactionsByUserId,
  getTransactionsByCompanyId,
}
