import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";
import { verifyToken } from '../middleware/auth/authMiddleware';

const router = Router();
const applicationController = new ApplicationController();


router.post('/login', applicationController.login); 
router.get('/getApplications', verifyToken, applicationController.getAllApplications); // verify that token exists



export default router;