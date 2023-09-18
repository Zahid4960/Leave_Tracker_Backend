const { mongoose, Schema } = require('mongoose')
const commonSchema = require('../schemas/common.schema')
const addressSchema = require('../schemas/address.schema')


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: [addressSchema],
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  emailVerifiedAt: {
    typr: Date
  },
  otp: {
    typr: Number
  },
  userType: {
    type: String,
    enum: ['Company', 'User'],
    default: 'User'
  },
  ...commonSchema.obj
});

module.exports = User = mongoose.model('User', userSchema);

