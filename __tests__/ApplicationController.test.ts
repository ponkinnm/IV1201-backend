import { Request, Response, NextFunction } from 'express';
import { ApplicationController } from '../src/controllers/ApplicationController';
import { AuthService } from '../src/services/AuthService';
import { ApplicationService } from '../src/services/ApplicationService';
import sequelize from '../src/config/dbsetup';
import Application from '../src/models/Application';
import { ApplicationDTO } from '../src/models/ApplicationDTO';
import { ApplicationDetailsDTO } from '../src/models/ApplicationDetailsDTO';
import * as expressValidator from 'express-validator';
import { ConflictError } from '../src/errors/ConflictError';
import { PersonDTO } from '../src/models/PersonDTO';

jest.mock('../src/services/AuthService');
jest.mock('../src/services/ApplicationService');
jest.mock('../src/config/dbsetup');

describe('ApplicationController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let controller: ApplicationController;
  let mockApplicationService: jest.Mocked<ApplicationService>;
  let transactionSpy: jest.SpyInstance;
  const mockedAuthService = jest.mocked(AuthService, { shallow: true });
  const mockedDb = jest.mocked(sequelize, { shallow: true });

  beforeEach(() => {
    req = { user: {} } as Partial<Request> as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response> as Response;

    next = jest.fn();

    // Create an instance of ApplicationController with a mock service
    mockApplicationService = {
      getAllApplications: jest.fn(),
      getApplicationDetailsById: jest.fn()
    } as Partial<ApplicationService> as jest.Mocked<ApplicationService>;
    controller = new ApplicationController(mockApplicationService);

    transactionSpy = jest
      .spyOn(mockedDb, 'transaction')
      .mockImplementation(async (callback: never) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return await callback();
      });

    // Reset mocks between tests
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('getAllApplications', () => {
    it('should return 401 if user is not a recruiter', async () => {
      // Simulate non-recruiter user
      mockedAuthService.isRecruiter.mockReturnValue(false);

      await controller.getAllApplications(req, res, next);

      expect(mockedAuthService.isRecruiter).toHaveBeenCalledWith(req.user);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
    //
    it('should return applications with status 200 if user is a recruiter', async () => {
      // Simulate authorized user
      mockedAuthService.isRecruiter.mockReturnValue(true);
      const fakeApplications = [
        { application_id: 1 },
        { application_id: 2 }
      ] as ApplicationDTO[];
      mockApplicationService.getAllApplications.mockResolvedValue(
        fakeApplications
      );

      await controller.getAllApplications(req, res, next);

      expect(AuthService.isRecruiter).toHaveBeenCalledWith(req.user);
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(mockApplicationService.getAllApplications).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeApplications);
    });

    it('should call next with error when an exception occurs', async () => {
      mockedAuthService.isRecruiter.mockReturnValue(true);
      const error = new Error('Test error');
      jest.spyOn(mockedDb, 'transaction').mockImplementation(async () => {
        throw error;
      });

      await controller.getAllApplications(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getApplicationDetailsById', () => {
    it('should return 404 if application is not found', async () => {
      const application_id = 1;
      req.params = { application_id: application_id.toString() };

      mockedAuthService.isRecruiter.mockReturnValue(true);
      mockApplicationService.getApplicationDetailsById.mockResolvedValue(
        undefined
      );

      await controller.getApplicationDetailsById(req, res, next);

      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Application not found' });
    });
    it('should return applicationDetails if authorized as recruiter', async () => {
      mockedAuthService.isRecruiter.mockReturnValue(true);
      const application_id = 1;
      req.params = {
        application_id: application_id.toString()
      };
      const fakeApplicationDetails = {
        application_id: 1
      } as ApplicationDetailsDTO;

      mockApplicationService.getApplicationDetailsById.mockResolvedValue(
        fakeApplicationDetails
      );

      await controller.getApplicationDetailsById(req, res, next);

      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(fakeApplicationDetails);
    });
  });

  describe('updateApplicationStatus', () => {
    it('should return 401 if user is not a recruiter', async () => {
      mockedAuthService.isRecruiter.mockReturnValue(false);
      req.body = { new_status_id: 2, old_status_id: 1 };
      req.params = { application_id: '1' };

      await controller.updateApplicationStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 400 if validation errors are present', async () => {
      // Simulate validation errors using jest.spyOn to override express-validator behavior.
      const validationResultMock = jest.spyOn(
        expressValidator,
        'validationResult'
      );
      validationResultMock.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Invalid value' }]
      } as never);

      mockedAuthService.isRecruiter.mockReturnValue(true);
      req.body = { new_status_id: 2, old_status_id: 1 };
      req.params = { application_id: '1' };

      await controller.updateApplicationStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid value' }]
      });
    });

    it('should return 404 if update fails (no row updated)', async () => {
      mockedAuthService.isRecruiter.mockReturnValue(true);
      req.body = { new_status_id: 2, old_status_id: 1 };
      req.params = { application_id: '1' };
      mockApplicationService.updateApplicationStatus.mockResolvedValue(
        undefined
      );

      await controller.updateApplicationStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return 409 if a ConflictError is thrown', async () => {
      mockedAuthService.isRecruiter.mockReturnValue(true);
      req.body = { new_status_id: 2, old_status_id: 1 };
      req.params = { application_id: '1' };

      const conflictError = new ConflictError('Conflict error message');
      jest.spyOn(sequelize, 'transaction').mockImplementation(async () => {
        throw conflictError;
      });

      await controller.updateApplicationStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('should return 200 with updated row on success', async () => {
      mockedAuthService.isRecruiter.mockReturnValue(true);
      req.body = { new_status_id: 2, old_status_id: 1 };
      req.params = { application_id: '1' };
      const fakeUpdatedRow = {
        application_id: 1,
        status: 2
      } as unknown as Application;
      mockApplicationService.updateApplicationStatus.mockResolvedValue(
        fakeUpdatedRow
      );

      await controller.updateApplicationStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeUpdatedRow);
    });
  });

  describe('submitApplication', () => {
    it('should return 400 if validation errors are present', async () => {
      const validationResultMock = jest.spyOn(
        expressValidator,
        'validationResult'
      );
      validationResultMock.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Validation error' }]
      } as never);

      req.body = { competenceProfile: [], availabilities: [] };
      await controller.submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.any(Array)
        })
      );
    });

    it('should return 409 if application submission fails', async () => {
      req.body = {
        competenceProfile: [{ competence_id: 1, years_of_experience: 3 }],
        availabilities: [{ from_date: '2021-01-01', to_date: '2021-12-31' }]
      };
      req.user = { person_id: 1 } as PersonDTO;
      mockApplicationService.submitApplication.mockResolvedValue(undefined);

      await controller.submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'You have already submitted an application .'
      });
    });

    it('should return 200 with submitted application on success', async () => {
      const fakeSubmittedApplication = {
        application_id: 1
      } as ApplicationDetailsDTO;
      req.body = {
        competenceProfile: [{ competence_id: 1, years_of_experience: 3 }],
        availabilities: [{ from_date: '2021-01-01', to_date: '2021-12-31' }]
      };
      req.user = { person_id: 1 } as PersonDTO;
      mockApplicationService.submitApplication.mockResolvedValue(
        fakeSubmittedApplication
      );

      await controller.submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeSubmittedApplication);
    });
  });
});
