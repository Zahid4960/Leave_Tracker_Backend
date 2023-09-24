const authService = require('../services/authService')


/**
 * controller to handle login functionality
 * @param {*} req 
 * @param {*} res 
 */
exports.logIn = async (req, res) => {
    let { email, password, isRemember } = req.body
    try{
      let data = await authService.login(email, password, isRemember)
      console.log(data)
      res.json(data)
    }catch(err){
        console.log(err)
    }
}
