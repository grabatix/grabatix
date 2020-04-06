const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = require("./EmployeeSchema")
const ProductSchema = require("./ProductSchema")
const IntuitTokenSchema = require("./IntuitTokenSchema")
const CloudinaryImageSchema = require("./CloudinaryImageSchema")
const AddressSchema = require("./AddressSchema")

mongoose.Promise = Promise;

const CompanySchema = new Schema({
    "Subdomain": String,
    "Logo": {
        type: CloudinaryImageSchema
    },
    "Id": String,
    "SyncToken": String,
    "CompanyName": String,
    "WebAddr": {
        "URI": String
    },
    "Email": {
        "Address": String
    },
    "CustomerCommunicationAddr": {
        type: AddressSchema
    },
    "CompanyAddr" :{
        type: AddressSchema
    },
    "PrimaryPhone": {
        "FreeFormNumber": String
    },
    "Employees": [
        EmployeeSchema
    ],
    "Products":[
        ProductSchema
    ],
    "Tokens": {
        type: IntuitTokenSchema
    }
})

module.exports = CompanySchema;