const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserName : {type : String, required: true, unique: true},
    PassWord : {type : String},
    entryDate : {type : Date , default : Date.now()}
})

const Users = mongoose.model('Users',userSchema,'users') // what you named , shcema name , mongoDB database table name.
const mySchema = {"Users":Users}
module.exports = mySchema