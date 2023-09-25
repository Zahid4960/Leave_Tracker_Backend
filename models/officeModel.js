const { Mongoose, Schema, default: mongoose } = require('mongoose')
const officeType = require('./officeTypeModel')
const commonSchema = require('../schemas/commonSchema')


const officeSchema = new Schema({
    officeTypeId: { type: Schema.ObjectId, ref: 'officeType' },
    isActive: { type: Boolean, default: true },
    ...commonSchema.obj
})

module.exports = Office = mongoose.model('Office', officeSchema)