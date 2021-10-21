var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mySchema = new Schema({
    city : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'city'
    },
    state : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'state'
    },
    country : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'country'
        }
    })

module.exports = mongoose.model('dropdowns',mySchema);