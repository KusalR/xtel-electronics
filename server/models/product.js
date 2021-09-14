const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//Product Model

const productsSchema =  new Schema({

    name:{
        type:String
    },
    url: {
        type: String,
    },
    productCategory:{
        type: String
    },
    description:{
        type: String
    },
    quantity:{
        type:String
    },
    user_id: {
        type: String
    }

});

module.exports = mongoose.model('product', productsSchema);

