const mongoose = require('mongoose')
const User = require('./user.model')

const commonSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
        updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: User
    },
    updatedBy: {
        type: mongoose.ObjectId,
        ref: User
    },
    deletedBy: {
        type: mongoose.ObjectId,
        ref: User
    }
})

const Common = mongoose.model('Common', commonSchema)


module.exports = Common

