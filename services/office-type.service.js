const officeTypeModel = require('../models/office-type.model')


/**
 * service function to handle office type creation
 * @param {*} item 
 * @returns {*} office type payload
 */
exports.store = async (item) => {
    return await officeTypeModel.create(item)
}


/**
 * service function to get a specific office type by using office type id
 * @param {string} officeTypeId
 * @returns {*} office type payload
 */
exports.show = async (officeTypeId) => {
    return await officeTypeModel.findById(officeTypeId)
}