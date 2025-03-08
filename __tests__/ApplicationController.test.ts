import { Request, Response, NextFunction } from 'express';
import { ApplicationController } from '../src/controllers/ApplicationController';
import { AuthService } from '../src/services/AuthService';
import { ApplicationService } from '../src/services/ApplicationService';
import sequelize from '../src/config/dbsetup';
import { ApplicationDTO } from '../src/models/ApplicationDTO';
import { ApplicationDetailsDTO } from '../src/models/ApplicationDetailsDTO';

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
});
