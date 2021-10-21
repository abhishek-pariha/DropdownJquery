var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    state: {type : String},
    country : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'country'
    },
})

//
module.exports = mongoose.model('state',mySchema);