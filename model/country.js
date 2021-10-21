const mongoose = require('mongoose');
var Schema = mongoose.Schema

const mySchema = new Schema({
    country : {type : String}
})

module.exports = mongoose.model('dropdown',mySchema);