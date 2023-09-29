const officeTypeModel = require('../models/officeTypeModel')


/**
 * service to handle office type creation
 * @param {*} item 
 * @returns office type paylod
 */
exports.create = async (item) => {
    return await officeTypeModel.create(item)
}