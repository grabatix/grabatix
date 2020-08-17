const Transaction = require('../models/Transaction/index')

const createTransaction = async (userId, companyId, transactionData) => {
  return new Promise(async (resolve, reject) => {
    return resolve(
      await Transaction.create({
        companyId,
        userId,
        ...transactionData,
      })
    )
  })
}

module.exports = { createTransaction }
