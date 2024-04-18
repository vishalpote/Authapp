import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protect=async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!req.headers.authorization){
        return res.status(401).json({message:"Not Authroized To Access This Token...!!"});
    }

    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user=await User.findById(decoded.id);
        if(!user){
            res.status(401).json({message:"User Not Found With This Id..!!"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message:"Not Authorized", error})
        next(error);
    }
}