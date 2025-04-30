const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    offeredSkills: { 
        type: [String],
        default: [] 
    },
    wantedSkills: { 
        type: [String], 
        default: [] 
    }}  
);
const User = mongoose.model('User', userSchema);
module.exports = User;