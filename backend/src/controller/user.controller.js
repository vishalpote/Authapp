import User from '../models/user.model.js'
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

export const register=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            res.status(401).json({message:"Please Enter All The Fields..!!"});
        }
        const userExist=await User.findOne({email});
        if(userExist){
            res.status(401).json({message:"User Is Already Exists..!!"});
        }
        const user=await User.create({username,email,password});
        res
          .status(200)
          .json({
            message: "User Created Succesfully..!!",
            data: user,
            token: user.genereteToken(),
            id: user._id.toString(),
          });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error..!!"+error.message});
        next(error);
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Please Enter All Required Fields..!!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found In Database..!!" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Password Does Not Match Please Try Again.." });
    }
    return res
      .status(200)
      .json({
        message: "User Logged In Successfully..!!",
        data: user,
        token: user.genereteToken(),
        id:user._id.toString()
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error.. " + error.message });
      next(error);
  }
};



export const forgetpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found In Database..!!" });
    }
    const resetToken = user.getResetPasswordToken();
    console.log(resetToken);
    await user.save();
    const resetUrl = `http://localhost:5173/resetPassword/${resetToken}`;
    const message = `
      <h1> You Have Requested a Password Reset </h1>
      <p>Please go to this link to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Email could not be sent. Please try again later." });
    }
  } catch (error) {
    console.error("Error in forgetpassword function:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const resetpassword=async(req,res,next)=>{
//   const resetToken=req.params.resetToken;
// const resetPasswordToken = crypto
//   .createHash("sha256")
//   .update(resetToken)
//   .digest("hex");

const resetPasswordToken=req.params.resetToken;

try {
    const user = await User.findOne({
      resetPasswordToken,
    });
    console.log(user);
    if(!user){
      return res.status(401).json({message:"Invalid Reset Token..!!"})
    }

    user.password=req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    return res.status(200).json({message:"Password Reset Successful..!!",data:user});
} catch (error) {
  next(error);
}

}


export const getUser=async(req,res,next)=>{
  try {
    // const {id}=req.params.id;
    const user=await User.find({})
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    return res.status(200).json({message:"Found The User.!!",data:user});
  } catch (error) {
    next(error);
  }
}