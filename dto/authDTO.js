/**
 * dto class for user
 */
class AuthDto {
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

class SignupDTO {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}

class SignupSuccessResponseDTO {
    constructor(id, firstName, lastName, email, isAccountActivatedByOwner, userType) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.isAccountActivatedByOwner = isAccountActivatedByOwner
        this.userType = userType
    }
}


/**
 * dto class for login
 */
class LoginDto extends AuthDto{
    constructor(email, password, isRemember) {
        super(email, password, isRemember)
    }
}


/**
 * dto class for success login payload
 */
class SuccessLoginDto extends AuthDto{
    constructor(id, firstName, email, token, isRemember, tokenExpiresAt, userType){
        super(firstName, email, token, isRemember, userType)
        this.id = id
        this.tokenExpiresAt = tokenExpiresAt
    }
}

module.exports = {
    AuthDto,
    SignupDTO,
    SignupSuccessResponseDTO,
    LoginDto,
    SuccessLoginDto
}