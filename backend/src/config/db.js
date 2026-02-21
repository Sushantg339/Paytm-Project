const mongoose = require('mongoose')

const conntectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = conntectToDb