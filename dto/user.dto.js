/**
 * dto class for user
 */
class UserDto {
    constructor(
        firstName,
        lastName,
        userName,
        email,
        emailVerifiedAt,
        recoveryEmail,
        address,
        dob,
        password,
        isAccountActivatedByOwner,
        otp,
        token,
        isRemember,
        userType,
        officeId
    ){
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.email = email
        this.emailVerifiedAt = emailVerifiedAt
        this.recoveryEmail = recoveryEmail
        this.address = address
        this.dob = dob
        this.password = password
        this.isAccountActivatedByOwner = isAccountActivatedByOwner
        this.otp = otp
        this.token = token
        this.isRemember = isRemember
        this.userType = userType
        this.officeId = officeId
    }
}

module.exports = UserDto