import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please Provide A Username.."]
    },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password:{
    type: String,
    required: [true,"Please Provide  Password.."],
    minlength:[5,"Password Should Be Atleast 5 characters.."],
    // select:false,
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
},
{
    timestamps:true,
}
);

userSchema.pre("save",async function(next){
  const user=this;
  if(!user.isModified("password"))
  {
    next()
  }

  user.password=await bcrypt.hash(user.password,10);
})


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genereteToken=function(){
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
      process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString();

    const hashedToken= crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordToken=hashedToken;

    this.resetPasswordExpire=Date.now()+10*(60*1000)

    return hashedToken;
}

const User = mongoose.model("User", userSchema);

export default User;
