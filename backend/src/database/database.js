import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const database=process.env.DATABASE
const connection=async()=>{
   try {
        await mongoose.connect(database)
        console.log("MongoDB connected Succesfully..!!");
   } catch (error) {
    console.log("Error While Connecting MongoDB: ", error);
   }
}



export default connection;