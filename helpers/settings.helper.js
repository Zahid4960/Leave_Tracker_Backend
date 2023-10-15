const moment = require('moment')


exports.convertIsoDateTimeToUTCDateTime = (dateTime) => {
    return moment(dateTime).utcOffset('+06:00').format('YYYY-MM-DD hh:mm:ss A')
}