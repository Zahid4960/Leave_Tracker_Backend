const { mongoose, Schema } = require('mongoose')
const commonSchema = require('../schemas/commonSchema')
const addressSchema = require('../schemas/addressSchema')


const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  emailVerifiedAt: { type: Date },
  recoveryEmail: { type: String },
  address: [addressSchema],
  dob: { type: String },
  password: { type: String, required: true },
  isAccountActivatedByOwner: { type: Boolean, default: false },
  otp: { type: Number },
  token: { type: String, required: true },
  isRemember: { type: Boolean, default: false },
  userType: { type: String, enum: ['Company', 'User', 'Admin'], default: 'User' },
  ...commonSchema.obj
});

module.exports = User = mongoose.model('User', userSchema);

