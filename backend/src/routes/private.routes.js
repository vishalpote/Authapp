import express from 'express';
import { getPrivateData } from '../controller/privat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const privateRouter=express.Router();

privateRouter.get('/',protect,getPrivateData);

export default privateRouter;