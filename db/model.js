const mongoose = require('mongoose');
const modesl=mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
        
    }) )


module.exports=modesl;

