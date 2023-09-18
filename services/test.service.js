const User = require('../models/user.model')
const Common = require('../models/common.model')


exports.test = () => {
    const newUser = new User({
        name: {
            firstName: 'zahid'
        },
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
    })

    let user = newUser.save()
    .then((user) => {
        console.log('User created:', user);
    })
    .catch((error) => {
        console.error('Error creating user:', error);
    });

    const log = new Common({
        createdBy: user._id,
    })
}