const mongoose,  { Schema, model } = require('mongoose');
const EmployeeSchema = require("./Employee")
const ProductSchema = require("./Product")
const IntuitTokenSchema = require("./IntuitToken")
const CloudinaryImageSchema = require("./CloudinaryImage")
const AddressSchema = require("./Address")

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

const Company = model("Company", CompanySchema);

module.exports = Company;