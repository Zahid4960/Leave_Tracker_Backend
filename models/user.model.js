const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of your application
module.exports = User;
