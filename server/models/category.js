const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        // required:true,
        
    }],
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    
});


module.exports = mongoose.model("Category",categorySchema);