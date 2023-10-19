const { Schema, mongoose } = require('mongoose')


/**
 * model for user login information
 */
const userLogInfoSchema = new Schema({
    ip: { type: String },
    country: { type: String },
    os: { type: String },
    device: { type: String },
    loginTime: { type: Date, default: Date.now() },
    isUnAuthorizedLoginAttempt: { type: Boolean, default: false }
})

module.exports = UserLogInfo = mongoose.model('UserLogInfo', userLogInfoSchema)