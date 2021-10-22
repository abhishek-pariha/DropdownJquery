const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    username : {type : String},
    email : {type : String},
    password : {type : String},
    confirmpassword : {type : String},
    DOB : {type : String},
    gender : {type : String},
    profileImg : {type : String},
    joindata : {type : Date, default : Date.now},
     
},{timestamps : true})
module.exports = mongoose.model('user',mySchema); 