import { Router } from 'express';
import { ApplicationController } from "../controllers/ApplicationController";
import { authMiddleware } from "../middleware/middleware_auth";


const router = Router();
const applicationController = new ApplicationController();

router.use(authMiddleware);


/**
 * @openapi
 * /applications:
 *   get:
 *      summary: Get all applications
 *      responses:
 *        200:
 *          description: List of all applications
 *        401:
 *          description: Unauthorized access
 */
router.get('/applications', applicationController.getAllApplications);

/**
 * @openapi
 * /applications/{application_id}:
 *   get:
 *      summary: Get application by ID
 *      parameters:
 *        - name: application_id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            description: The ID of the application
 *      responses:
 *        200:
 *          description: Application details retrieved successfully
 *        401:
 *          description: Unauthorized access
 *        404:
 *          description: Application not found
 */
router.get('/applications/:application_id', applicationController.getApplicationDetailsById);

/**
 * @openapi
 * /applications/{application_id}/status:
 *   put:
 *      summary: Update application status
 *      parameters:
 *        - name: application_id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            description: The ID of the application
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  description: The new status_id for the application
 *      responses:
 *        200:
 *          description: Application status updated successfully
 *        401:
 *          description: Unauthorized access
 *        404:
 *          description: Application not found
 */
router.put('/applications/:application_id/status', applicationController.updateApplicationStatus);


export default router; 
