const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {otpTemplate} = require("../mail/templates/otpTemplate")
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    Default: Date.now(),
    expires: 5 * 60 * 1000,
  },
  otp: {
    type: String,
    required: true,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otpTemplate(otp),
    );
    console.log("Email sent Successfully:", mailResponse);
  } catch (error) {
    console.log("Error occured while sending emails: ", error);
    console.log("otp:-",otp);
    console.log("email:-",email);

    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  if(this.isNew){
    await sendVerificationEmail(this.email, this.otp);
    
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;