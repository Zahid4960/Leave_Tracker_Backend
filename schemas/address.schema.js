const { Schema } = require('mongoose')


const addressSchema = new Schema({
  addresName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  postalCode: { type: String, required: true }
})

module.exports = addressSchema