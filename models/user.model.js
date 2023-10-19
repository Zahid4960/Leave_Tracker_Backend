const { mongoose, Schema } = require('mongoose')
const commonSchema = require('../schemas/common.schema')
const addressSchema = require('../schemas/address.schema')


/**
 * model for user
 */
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
  userType: { type: String, enum: ['Office', 'User', 'Admin'], default: 'User' },
  officeId: { type: Schema.ObjectId, ref: 'office' },
  ...commonSchema.obj
});

module.exports = User = mongoose.model('User', userSchema);

