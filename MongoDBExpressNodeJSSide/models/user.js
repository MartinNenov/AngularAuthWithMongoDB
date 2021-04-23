const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlength:3,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require:true,
        minlength:6
    }
})

module.exports = mongoose.model('User',UserSchema);