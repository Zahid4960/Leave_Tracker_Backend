const { mongoose, Schema } = require('mongoose')
const user = require('../models/userModel')

const commonSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date },
    createdBy: { type: Schema.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.ObjectId, ref: 'user' },
    deletedBy: { type: Schema.ObjectId, ref: 'user' }
})

module.exports = commonSchema

