const userModel = require('../models/userModel')
const {
    isUserExistOrNotByEmail,
    generateHashedPasword,
    generateToken
} = require('../repositories/authRepo')

const email = process.env.ADMIN_EMAIL
const recoveryEmail = process.env.ADMIN_RECOVERY_EMIAL
const firstName = process.env.ADMIN_FIRSTNAME
const lastName = process.env.ADMIN_LASTNAME
const userName = process.env.ADMIN_USERNAME
const addressName = process.env.ADMIN_ADRESS_NAME
const city = process.env.ADMIN_CITY
const state = process.env.ADMIN_STATE
const country = process.env.ADMIN_COUNTRY
const postalCode = process.env.ADMIN_POSTAL_CODE
const dob = process.env.ADMIN_DOB
const AdminPassword = process.env.ADMIN_PASSWORD
const salt = process.env.PASSWORD_SALT
const secret = process.env.JWT_SECRET

const constantFile = require('./constants')


/**
 * function to create super admin user at the time of appilication mount
 */
exports.createSuperAdminUser = async () => {
    try{
        let user = await isUserExistOrNotByEmail(email)
        
        if(! user){
            if(createUser()){
                console.log('Super admin user created successfully.')
            }
        }else{
            console.log('Super admin user has already been created.')
        }
    }catch(err){
        console.log('Super admin user creation failed. Please check error log.')
        console.error(err)
        process.exit(1)
    }
}


const createUser = async () => {
    let addressObject = {
        addresName: addressName,
        city: city,
        state: state,
        country: country,
        postalCode: postalCode
    }

    let userObject = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        emailVerifiedAt: Date.now(),
        recoveryEmail: recoveryEmail,
        address: [addressObject],
        dob: dob,
        isAccountActivatedByOwner: true,
        otp: Math.floor(Math.random() * 10000),
        isRemember: false,
        userType: constantFile.ADMIN,
    }

    let hashedPassword = await generateHashedPasword(AdminPassword, salt)
    let jwtToken = await generateToken(email, secret)

    userObject.password = hashedPassword
    userObject.token = jwtToken

    let user = await userModel.create(userObject)

    if(user){
        let userId = user._id
        user.createdBy = userId
        user.updatedBy = userId
        user.save()
    }
}