const bcrypt = require('bcrypt')

class AuthHelper {
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, parseInt(process.env.PASSWORD_SALT))
    }
}

module.exports = new AuthHelper()