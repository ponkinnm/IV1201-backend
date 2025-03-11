import { Router } from 'express';
import { ApplicationController } from '../controllers/ApplicationController';
import { authMiddleware } from '../middleware/middleware_auth';
import { CompetenceController } from '../controllers/CompetenceController';
import { ApplicationService } from '../services/ApplicationService';
import { ApplicationRepository } from '../repositories/ApplicationRepository';
import { body } from 'express-validator';
import { CompetenceRepository } from '../repositories/ComptenceRepository';
import { CompetenceService } from '../services/CompetenceService';

const router = Router();
const applicationRepository = new ApplicationRepository();
const applicationService = new ApplicationService(applicationRepository);
const applicationController = new ApplicationController(applicationService);
const competenceRepository = new CompetenceRepository();
const competenceService = new CompetenceService(competenceRepository);
const competenceController = new CompetenceController(competenceService);

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
 *                new_status_id:
 *                  type: integer
 *                  description: The new status_id for the application
 *                old_status_id:
 *                  type: integer
 *                  description: The old status_id for the application
 *      responses:
 *        200:
 *          description: Application status updated successfully
 *        401:
 *          description: Unauthorized access
 *        404:
 *          description: Application not found
 *        409:
 *          description: Application updated by other user
 */
router.put(
  '/applications/:application_id/status',
  [
    body('new_status_id').isInt({ min: 1 }).withMessage('Invalid status ID'),
    body('old_status_id').isInt({ min: 1 }).withMessage('Invalid status ID')
  ],
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
router.post(
  '/applications/submit',
  [
    body('availabilities')
      .isArray({ min: 1 })
      .withMessage('You should specify at least one availability period')
      .contains({ from_date: Date, to_date: Date })
      .custom((value) => {
        value.forEach((date: { from_date: string; to_date: string }) => {
          if (date.from_date > date.to_date) {
            throw new Error('From date should be before to date');
          }
          if (new Date(date.from_date) < new Date()) {
            throw new Error('From date should be in the future');
          }
        });
        return true;
      }),
    body('competenceProfile')
      .isArray({ min: 1 })
      .withMessage('You should specify at least one competence')
      .contains({ competence_id: Number, years_of_experience: Number })
      .custom((value) => {
        value.forEach(
          (comp: { competence_id: number; years_of_experience: number }) => {
            if (comp.years_of_experience < 0 || comp.years_of_experience > 99) {
              throw new Error('Years of experience should be a number 0-99');
            }
          }
        );
        return true;
      })
  ],
  applicationController.submitApplication
);

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
