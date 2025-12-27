
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const mailSender = require('../utils/mailSender');
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
const {otpTemplate} = require("../mail/templates/otpTemplate")
const Profile = require("../models/Profile");
require("dotenv").config();

//send otp

exports.sendOTP = async (req, res) => {
  try {
    // fetch email from request ki body
    const { email } = req.body;

    // check if user already exist
    const chackUserPreSent = await User.findOne({ email });

    //if user is already exits,then return a response.
    if (chackUserPreSent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //if user not exist already,then we generate OTP.

    //generate otp

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
		
    // console.log("OTP generated:-", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }
   
    
		// console.log("Result is Generate OTP Func");
		// console.log("Result", result);

    const otpPayload = { email, otp };

    //create an en entry in db for otp

    const otpBody = await OTP.create(otpPayload);
    // console.log("OTP body:-",otpBody);

    // return response successfully

    res.status(200).json({
      success: true,
      message: "OTP sent Successfully.",
      otp,
    });
  } catch (error) {
    console.log("Issues Occure in generate Otp");
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//sign-Up

exports.signUp = async (req, res) => {
  try {
    //data fetch from request ki body

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contectNumber,
      otp,
    } = req.body;

    //validate krlo

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //2 password match krlo

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: `Password and confirm Password value does't match,please try again. `,
      });
    }

    // check user already exist or not

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    //find most recent OTP stored for the user
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // console.log(recentOtp);

    //validate OTP
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //HASH password
    const hashedPassword = await bcrypt.hash(password, 10);

    //entry create in db
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contectNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contectNumber,
      password: hashedPassword,
      accountType:accountType,
      approved:approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    });
    // return res
    return res.status(200).json({
      success: true,
      user,
      message: "User is registered successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registerd. please try again",
    });
  }
};

//login

exports.login = async (req, res) => {
  try {
    // get data from request ki body
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, please try again.",
      });
    }
    // user check exist or not

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registrered, please signup first",
      });
    }

    // genrate JWT, after password matching

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;

      // create cookie and send respponse.
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
    //res.coookie("key" , "value",options).
        success: true,
        token,
        user,
        message: "Logged in SuccessFully.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

//change password

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    // console.log(userDetails)

    
    // get data from request
    const { password, newPassword, confirmPassword } = req.body;
    // validation
    const email = userDetails.email;
    const user = await User.findOne({ email });
    if (!password || !newPassword || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Please fill all details",
      });
    } else if (newPassword !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "NewPassword and confirmPassword not matched, please try again.",
      });
    } else if (await bcrypt.compare(password, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // entry create in db
      const updatedUserDetails = await User.findOneAndUpdate(
        { email: email },              // find basis of email.
        { password: hashedPassword },  // update password
        { new: true }                  // return new updated password.
      );

      // send mail - Password Updated.
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          `Password Updated Successfully`,
          passwordUpdated(
            updatedUserDetails.email,
            updatedUserDetails.firstName
          )
        );
        // console.log(emailResponse);
        if (emailResponse && emailResponse.response) {
          console.log("Email sent successfully");
        } else {
          console.log("Email sent successfully, but no response received.");
        }
        console.log("Email sent successfully");
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        });
      }

      // return res
      return res.status(200).json({
        success: true,
        message: "Password changed successfully.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Password can't be changed, issue in password change.",
      error: error.message,
    });
  }
};