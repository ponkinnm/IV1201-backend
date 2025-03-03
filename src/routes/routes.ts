import { Router } from 'express';
import { ApplicationController } from '../controllers/ApplicationController';
import { authMiddleware } from '../middleware/middleware_auth';
import { CompetenceController } from '../controllers/CompetenceController';

const router = Router();
const applicationController = new ApplicationController();
const competenceController = new CompetenceController();

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
router.get(
  '/applications/:application_id',
  applicationController.getApplicationDetailsById
);

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
router.put(
  '/applications/:application_id/status',
  applicationController.updateApplicationStatus
);

/**
 * @openapi
 * /applications/submit:
 *   post:
 *      summary: Submit a new application
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                person_id:
 *                  type: integer
 *                  description: The ID of the applicant
 *                competenceProfile:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      competence_id:
 *                        type: integer
 *                        description: The ID of the competence
 *                      years_of_experience:
 *                        type: number
 *                        description: Years of experience with this competence
 *                availabilities:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      from_date:
 *                        type: string
 *                        format: date
 *                        description: Start date of availability
 *                      to_date:
 *                        type: string
 *                        format: date
 *                        description: End date of availability
 *      responses:
 *        200:
 *          description: Application submitted successfully
 *        401:
 *          description: Unauthorized access
 *        400:
 *          description: Missing or invalid data
 */
router.post('/applications/submit', applicationController.submitApplication);

/**
 * @openapi
 * /competences:
 *   get:
 *      summary: Get all competences
 *      responses:
 *        200:
 *          description: List of all competences
 *        401:
 *          description: Unauthorized access
 */
router.get('/competences', competenceController.getAllCompetence);

export default router;
