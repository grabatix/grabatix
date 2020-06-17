const { model } = require('mongoose');
const UserSchema = require('../../schema/UserSchema');

const User = model('User', UserSchema);

module.exports = User;
