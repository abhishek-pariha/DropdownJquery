var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mySchema = new Schema({
    city : {
        type : String
    },
    state : {
        type : String
    },
    country :  
        {
            type : String
        }
    })

module.exports = mongoose.model('dropdowns',mySchema);