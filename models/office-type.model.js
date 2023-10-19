const { mongoose, Schema } = require('mongoose')


/**
 * model for office type
 */
const officeTypeSchema = new Schema({
    officeType: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date }
})

module.exports = OfficeType = mongoose.model('OfficeType', officeTypeSchema)