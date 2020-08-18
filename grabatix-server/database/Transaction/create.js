const Transaction = require('../models/Transaction/index')

const createTransaction = async ({companyId, userId, total, cart}) => {
  return new Promise(async (resolve, reject) => {
    return resolve(
      await Transaction.create({
        companyId,
        userId,
        total,
        cart
      })
    )
  })
}

module.exports = { createTransaction }
