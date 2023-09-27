const officeTypeModel = require('../models/officeTypeModel')


/**
 * service to handle office type creation
 * @param {*} item 
 * @returns 
 */
exports.create = async (item) => {
    return await officeTypeModel.create(item)
}