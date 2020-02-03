const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    username:String,
    provider:String,
    facebookId:String,
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});
//Store more details about provider as well

module.exports = mongoose.model('User', UserSchema);