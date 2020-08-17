const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const TransactionSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId, 
        ref: `Company` 
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: `User` 
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    cart: Schema.Types.Mixed,
    modifications: Schema.Types.Mixed
});

module.exports = TransactionSchema;
