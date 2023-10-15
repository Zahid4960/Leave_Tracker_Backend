const UserModel = require('../models/user.model')
const UserDto = require('../dto/user.dto')
const AddressDto = require('../dto/address.dto')
const constantFile = require('../constant/constants')

const { isUserExistOrNotByEmail, generateHashedPasword, generateToken } = require('../repositories/auth.repo')

const email = process.env.ADMIN_EMAIL


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
        console.error('Super admin user creation failed. Please check error log.')
        console.error(err)
        process.exit(1)
    }
}


/**
 * function to create super admin by using dto
 */
const createUser = async () => {
    const hashedPassword = await generateHashedPasword(process.env.ADMIN_PASSWORD, process.env.PASSWORD_SALT)
    const jwtToken = await generateToken(email, process.env.JWT_SECRET)

    const addressDto = new AddressDto()
    addressDto.addresName = process.env.ADMIN_ADRESS_NAME
    addressDto.city = process.env.ADMIN_CITY
    addressDto.state = process.env.ADMIN_STATE
    addressDto.country =  process.env.ADMIN_COUNTRY
    addressDto.postalCode = process.env.ADMIN_POSTAL_CODE

    const userDto = new UserDto()
    userDto.firstName = process.env.ADMIN_FIRSTNAME
    userDto.lastName = process.env.ADMIN_LASTNAME
    userDto.userName = process.env.ADMIN_USERNAME
    userDto.email = email
    userDto.emailVerifiedAt = Date.now()
    userDto.recoveryEmail = process.env.ADMIN_RECOVERY_EMIAL
    userDto.dob = process.env.ADMIN_DOB
    userDto.address = [addressDto]
    userDto.isAccountActivatedByOwner = true
    userDto.otp = Math.floor(Math.random() * 10000)
    userDto.isRemember = false
    userDto.userType = constantFile.ADMIN
    userDto.password = hashedPassword
    userDto.token = jwtToken

    let user = await UserModel.create(userDto)

    if(user){
        let userId = user._id
        user.createdBy = userId
        user.updatedBy = userId
        user.save()
    }
}