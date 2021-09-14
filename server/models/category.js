const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//Category Model

const categorySchema =  new Schema({

    category:{
        type:String
    },
    url:{
        type: String
    }

});

module.exports = mongoose.model('category', categorySchema);

