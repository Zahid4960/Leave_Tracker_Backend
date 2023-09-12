const mongoose = require('mongoose')
const Common = require('./common.model')

const userSchema = new mongoose.Schema({
  name: {
    type: Name.schema,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: [
    {
      type: Address.schema,
      required: true
    }  
  ],
  age: {
    type: Number
  },
  userType: {
    type: String,
    enum: ['Company', 'User'],
    default: 'User'
  },
  commonFields: {
    type: Common.schema,
    required: true
  }
});

const User = mongoose.model('User', userSchema);


const nameSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  userName: {
    type: String
  }
})

const Name = mongoose.model('Name', nameSchema)

const addressSchema = new mongoose.Schema({
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

const Address = mongoose.model('Address', addressSchema)


module.exports = User
