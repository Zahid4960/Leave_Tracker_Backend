const { mongoose, Schema } = require('mongoose')
const Common = require('./common.model')


const nameSchema = new Schema({
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
  }
})


const addressSchema = new Schema({
  addresName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
})


const userSchema = new Schema({
  name: nameSchema,
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
  commonFields: {
    type: Schema.ObjectId,
    ref: 'Common'
  }
});

module.exports = User = mongoose.model('User', userSchema);

