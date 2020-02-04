const mongoose,  { Schema, model } = require('mongoose');
const CloudinaryImageSchema = require("./CloudinaryImage");
const AddressSchema = require("./Address")

mongoose.Promise = Promise;

const CustomerSchema = new Schema({
    "DisplayName": String,
    "Title": String, 
    "GivenName": String,
    "FamilyName": String,
    "Suffix": String,
    "PrimaryEmailAddr": {
        "Address": String
    },
    "PrimaryPhone": {
        "FreeFormNumber": String
    }, 
    "Id": String,
    "BillAddr": {
        type: AddressSchema
    },
    "SyncToken": String,
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_])[A-z0-9#?!@$%^&*-_]{8,}$/.test(v);
            },
            message: 'Password must be at least 8 characters in length include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character (ie. #?!@$%^&*-_).'
        }
    },
    "ProfileImage": {
        type: CloudinaryImageSchema
    },
    "Transactions": {}
})

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;