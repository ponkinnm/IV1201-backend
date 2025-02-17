import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";
import { authMiddleware } from "../middleware/middleware_auth";

const router = Router();
const applicationController = new ApplicationController();
router.use(authMiddleware);

router.get('/applications', applicationController.getAllApplications);

router.get('/applications/:application_id', applicationController.getApplicationDetailsById);

router.put('/applications/:application_id/status', applicationController.updateApplicationStatus);

export default router;