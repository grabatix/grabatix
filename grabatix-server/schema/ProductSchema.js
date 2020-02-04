const mongoose,  { Schema } = require('mongoose');
const ProductCategorySchema = require("./ProductCategorySchema")
const CloudinaryImageSchema = require("./CloudinaryImageSchema")

mongoose.Promise = Promise;

const ProductSchema = new Schema({
    "Id": String,
    "SyncToken": String,
    "Name": String,
    "Type": String,
    "SubItem": Boolean,
    "ParentRef": {
        "name": String,
        "value": String
    },
    "UnitPrice": Number,
    "Category": {
        type: ProductCategorySchema
    },
    "BackgroundImage": {
        type: CloudinaryImageSchema
    }
})

module.exports = ProductSchema;