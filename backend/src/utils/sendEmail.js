import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail=(options)=>{
   const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     auth: {
       user: process.env.EMAIL_USERNAME,
       pass: process.env.EMAIL_PASSWORD,
     },
   });


    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };


    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    })
}


export default sendEmail;