import { Request, Response, NextFunction } from 'express';
import { ApplicationController } from '../src/controllers/ApplicationController';
import { AuthService } from '../src/services/AuthService';
import { ApplicationService } from '../src/services/ApplicationService';

jest.mock('../src/services/AuthService');
jest.mock('../src/services/ApplicationService');

describe('ApplicationController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let controller: ApplicationController;

  beforeEach(() => {
    req = { user: {} } as Partial<Request> as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response> as Response;

    next = jest.fn();

    // Create an instance of ApplicationController with a mock service
    const mockApplicationService = {
      getAllApplications: jest.fn()
    } as Partial<ApplicationService> as ApplicationService;
    controller = new ApplicationController(mockApplicationService);

    // Reset mocks between tests
    jest.clearAllMocks();
  });

  describe('getAllApplications', () => {
    it('should return 401 if user is not a recruiter', async () => {
      // Simulate non-recruiter user
      const mockedAuthService = jest.mocked(AuthService, { shallow: true });
      mockedAuthService.isRecruiter.mockReturnValue(false);

      await controller.getAllApplications(req, res, next);

      expect(mockedAuthService.isRecruiter).toHaveBeenCalledWith(req.user);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });
});
