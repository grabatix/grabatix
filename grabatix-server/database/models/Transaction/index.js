const { model } = require('mongoose');
const TransactionSchema = require('../../schema/TransactionSchema');

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction;