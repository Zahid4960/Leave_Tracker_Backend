const userModel = require('../models/userModel')
const authRepo = require('../repositories/authRepo')

const email = process.env.ADMIN_EMAIL
const recoveryEmail = process.env.ADMIN_RECOVERY_EMIAL
const firstName = process.env.ADMIN_FIRSTNAME
const lastName = process.env.ADMIN_LASTNAME
const userName = process.env.ADMIN_USERNAME

// const constantFile = require('./constants')


exports.createSuperAdminUser = async () => {
    try{
        let user = await authRepo.isUserExistOrNotByEmail(email)
        
        if(! user){
            if(createUser()){
                console.log('Super admin user created successfully.')
            }
        }else{
            console.log('Super admin user has already been created.')
        }
    }catch(err){
        console.log('Super admin user creation failed. Please check error log.')
        console.error(err);
        process.exit(1);
    }
}


const createUser = async () => {
    let userObject = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        emailVerifiedAt: Date.now(),
        recoveryEmail: recoveryEmail,
        password: '1234',
        // address
        // dop
        isAccountActivatedByOwner: true,
        // otp:
        token: 'djjjjjjjjjjjjjjn',
        isRemember: false,
        userType: 'Admin',
    }
   
    await userModel.create(userObject)
}