const mongoose = require('mongoose')
const host = process.env.MONGODB_HOST
const port = process.env.MONGODB_PORT
const dbName = process.env.MONGODB_NAME

console.log(host, port, dbName)

const dbConnection = async () => {
    try{
        let connect = await mongoose.connect(`mongodb://${host}:${port}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        if(connect){
            console.log('DB connected successfully!')
        }
    }catch(err){
        console.log('DB connection failed. Please check error log.')
        console.error(err);
        process.exit(1);
    }
}

module.exports = dbConnection