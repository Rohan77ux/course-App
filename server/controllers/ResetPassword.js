const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req,res)=>{
    try{
        const email = req.body.email;

        const user = await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:`Your Email: ${email} is not registered With us Enter a Valid Email`,
            });
        }

        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires: Date.now()+3600000,
                                        },
                                        {new:true});
      const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);


        return res.json({
            success:true,
            message:'Email send successfully,Please Check Your Email to Continue Further.',
            
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sendind reset pwd mail."
        })
    }

}


exports.resetPassword = async(req,res) =>{
    try{
        // data fetch
        const {password,token,confirmPassword} =  req.body;

        // validation 
        
        if(password !== confirmPassword ){
            return res.json({
                success:false,
                message:"Password not matching.",

            });
        }
        
        
        //getuserdetails from db using token 
        
        const userDetails = await User.findOne({token:token});
        // console.log("user details :- : ",userDetails);

        // if no entry - invalide token 
        
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        
        // token time check
        
        if((userDetails.resetPasswordExpires<Date.now())){
            return res.status(403).json({
                success:false,
                message:'Your Token is Expired,please regenrate your token.',
            });
        }
        // console.log(userDetails.resetPasswordExpires);
        // console.log(Date.now());
        // hash pwd


        const hashedPassword = await bcrypt.hash(password,10); 
        // password updates
        await User.findOneAndUpdate(
                                    {token:token},              //find basis of token.
                                    {password:hashedPassword},  //update password
                                    {new:true},                 //return new upadated password.
                                );
        // return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfully.",
        }); 

    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'Issue occure in reset password.'
        })
    };
   

}