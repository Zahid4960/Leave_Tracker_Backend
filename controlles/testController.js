const testService = require('../services/testService')

exports.test = (req, res) => {
    res.send(testService.test())
}
