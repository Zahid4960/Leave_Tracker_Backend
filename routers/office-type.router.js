const express = require('express')
const router = express.Router()
const officeTypesController = require('../controllers/office-types.controller')
const { verifyAdminToken } = require('../middlewares/auth.middleware')

router.post('/create', verifyAdminToken, officeTypesController.store)
router.get('/:officeTypeId', verifyAdminToken, officeTypesController.show)

module.exports = router