const { mongoose, Schema } = require('mongoose')
const User = require('../models/user.model')

const commonSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
        updatedAt: {
        type: Date,
        default: Date.now(),
    },
    deletedAt: {
        type: Date,
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    deletedBy: {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = commonSchema

