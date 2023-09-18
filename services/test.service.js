const User = require('../models/user.model')


exports.test = async () => {
    const userObject = {
        firstName: 'zahid',
        email: 'zahid@gmail.com',
        address: [
            {
                addresName: 'hdhhd',
                city: 'Bogura',
                country: "Bangladesh",
                postalCode: '5840'
            }
        ],
        age: 28,
        password: 'password',
        emailVerifiedAt: '',
        otp: 1234,
        userType: 'User'
    }

    let user = await User.create(userObject)

    if(user){
        user.createdBy = user._id;
        user.updatedBy = user._id;
        await user.save()
    }
}