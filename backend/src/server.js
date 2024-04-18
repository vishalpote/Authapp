import express from "express";
import dotenv from 'dotenv';
import router from "./routes/user.routes.js";
import cors from 'cors';
import connection from "./database/database.js";
import errorMiddleware from "./middleware/error.middleware.js";
import privateRouter from "./routes/private.routes.js";
dotenv.config();

const port=process.env.PORT || 8070;
const app= express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth",router);
// app.use("/api/v1/private",privateRouter);
app.use(errorMiddleware);

connection();
app.listen(port,()=>{
    console.log(`Port Is Running On ${port}`);
});