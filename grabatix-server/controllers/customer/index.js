const { to } = require(`await-to-js`)
const {
    createTransaction
} = require(`../../database/Transaction`)

// GET details of existing user.
exports.postTransaction = async (req, res) => {
    const companyId = req.params.companyId
    const userId = req.params.userId
    const cart = req.body.cart
    const total = req.body.total
    let transaction
    try {
        const transactionData = { cart, total }
        transaction = await createTransaction(userId, companyId, transactionData)
    } catch (err) {
        return res.status(500).json({ error: { message: `DB Error`, data: err } })
    }

    res.status(201).json({ transaction: transaction.id })
}