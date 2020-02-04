const mongoose,  { Schema } = require('mongoose');

mongoose.Promise = Promise;

const AddressSchema = new Schema ({
    "City": String, 
    "Country": String, 
    "Line1": String, 
    "PostalCode": String, 
    "CountrySubDivisionCode": String, 
    "Id": String
})

module.exports = AddressSchema