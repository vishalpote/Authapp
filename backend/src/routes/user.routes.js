import express from "express";
import { forgetpassword, getUser, login, register, resetpassword } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/", protect, getUser);
router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgetpassword)
router.put('/resetpassword/:resetToken', resetpassword)

export default router;