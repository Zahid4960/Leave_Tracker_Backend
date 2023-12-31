const { Schema } = require('mongoose')


/**
 * schema for addresses
 */
const addressSchema = new Schema({
  addressName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  postalCode: { type: String, required: true }
})

module.exports = addressSchema