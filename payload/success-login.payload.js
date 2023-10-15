class SuccessLoginPayload {
    constructor(id, firstName, email, token, tokenExpiresAt, userType){
        this.id = id
        this.firstName = firstName
        this.email = email
        this.token = token
        this.tokenExpiresAt = tokenExpiresAt
        this.userType = userType
}
}

module.exports = SuccessLoginPayload