const mongoose = require('mongoose');
const { Schema } = mongoose;
const CloudinaryImageSchema = require('./CloudinaryImageSchema');

mongoose.Promise = Promise;

const EmployeeSchema = new Schema({
  GivenName: String,
  FamilyName: String,
  PrimaryEmailAddr: {
    Address: String,
  },
  Id: String,
  V4IDPseudonym: String,
  SyncToken: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_])[A-z0-9#?!@$%^&*-_]{8,}$/.test(
          v
        );
      },
      message:
        'Password must be at least 8 characters in length include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character (ie. #?!@$%^&*-_).',
    },
  },
  ProfileImage: {
    type: CloudinaryImageSchema,
  },
});

module.exports = EmployeeSchema;
