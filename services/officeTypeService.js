const officeTypeModel = require('../models/officeTypeModel')


/**
 * service to handle office type creation
 * @param {*} item 
 * @returns office type paylod
 */
exports.store = async (item) => {
    return await officeTypeModel.create(item)
}


/**
 * service to get a specific office type by using office type id
 * @param {*} officeTypeId 
 * @returns office type payload
 */
exports.show = async (officeTypeId) => {
    const data = await officeTypeModel.findById(officeTypeId)
    return data
}