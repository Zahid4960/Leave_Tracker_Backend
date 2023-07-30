const testService = require('../services/testService')

const test = (req, res) => {
    res.send(testService.test())
}

module.exports = {
    test
}