const express = require('express')
const router = express.Router()

const officeTypesController = require('../controllers/officeTypesController')
const { verifyAdminToken } = require('../middlewares/authMiddleware')

router.post('/create', verifyAdminToken, officeTypesController.store)
router.get('/:officeTypeId', verifyAdminToken, officeTypesController.show)

module.exports = router