const testService = require('../services/test.service')

exports.test = (req, res) => {
    res.send(testService.test())
}
