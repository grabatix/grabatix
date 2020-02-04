const mongoose,  { Schema } = require('mongoose');
const CloudinaryImageSchema = require("./CloudinaryImage")

mongoose.Promise = Promise;

const ProductCategorySchema = new Schema({
    "Id": String,
    "SyncToken": String,
    "Name": String,
    "Type": String,
    "SubItem": Boolean,
    "ParentRef": {
        "name": String,
        "value": String
    },
    "Icon": {
        type: CloudinaryImageSchema
    }
})

module.exports = ProductCategorySchema;