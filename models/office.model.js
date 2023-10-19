const { Schema, mongoose } = require('mongoose')
const commonSchema = require('../schemas/common.schema')


/**
 * model for office
 */
const officeSchema = new Schema({
    officeTypeId: { type: Schema.ObjectId, ref: 'officeType' },
    isActive: { type: Boolean, default: true },
    ...commonSchema.obj
})

module.exports = Office = mongoose.model('Office', officeSchema)