const Transaction = require('../models/Transaction/index');

const checkAndUpdateQuantity = async (transactionId, productId) => {
    const query = { _id: transactionId }
    const transaction = await Transaction.findOne(query)
    if (transaction.length) {
        const idx = transaction.cart.findIndex(
            (item) => item.productId === productId
        )
        if (idx > -1) {
            const quantity = transaction.cart[idx].quantity
            if (quantity > 0) {
                transaction.cart[idx].quantity --
                return transaction.save()
            } else {
                throw new Error(`No remaining quantity`)
            }
        } else {
            throw new Error(`Unable to Find Purchased Item`)
        }
    } else {
        throw new Error(`Unable to Find Transaction`)
    }
}

module.exports = { checkAndUpdateQuantity }