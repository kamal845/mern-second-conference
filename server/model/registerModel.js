const mongoose = require("mongoose");
const registerSchema= mongoose.Schema({
Name:{
    type:String,
    required:true
},
Phone:{
    type:Number,
    required:true
},
Email:{
    type:String,
    required:true
},
Timing:{
    type:String,
    required:true
},
Purpose:{
    type:String,
    required:true  
}
})

module.exports=mongoose.model('register',registerSchema);