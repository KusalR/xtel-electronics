const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//User Model

const UserSchema = mongoose.Schema({

    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    phone:{
        type:String
    },
    Address:{
        type:String
    },
    UserName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('user', UserSchema)
