
const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
    
    
    gender:{
        type:String,
        enum: ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"],
    },
    dateOfBirth:{
        type:String,
        
    },
    about:{
        type:String,
        trim:true,
    },
    contectNumber:{
        type:String,
        trim:true,
    },
    
});


module.exports = mongoose.model("Profile",profileSchema);