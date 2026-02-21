const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique: true,
        required:true
    },
    firstName : {
        type : String,
        required:true
    },
    lastName : {
        type: String
    },
    password: {
        type: String,
        required : true
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel