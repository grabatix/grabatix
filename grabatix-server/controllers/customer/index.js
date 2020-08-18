const { to } = require(`await-to-js`)
const {
    createTransaction
} = require(`../../database/Transaction`)

// GET details of existing user.
exports.postTransaction = async (req, res) => {
    const companyId = req.params.companyId
    const userId = req.params.userId
    const transactionData = { userId, companyId, cart: req.body.cart, total: req.body.total }
    console.log(transactionData)
    let transaction
    try {
        
        transaction = await createTransaction(transactionData)
    } catch (err) {
        return res.status(500).json({ error: { message: `DB Error`, data: err } })
    }

    res.status(201).json({ transaction: transaction.id })
}