import { CompetenceController } from '../src/controllers/CompetenceController';
import { Request, Response, NextFunction } from 'express';
import { sequelize } from '../src/models';
import { CompetenceService } from '../src/services/CompetenceService';
import Competence from '../src/models/Competence';

describe('CompetenceController', () => {
  let controller: CompetenceController;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let mockCompetenceService: jest.Mocked<CompetenceService>;
  const mockedDb = jest.mocked(sequelize, { shallow: true });
  let transactionSpy: jest.SpyInstance;

  beforeEach(() => {
    mockCompetenceService = {
      getAllCompetences: jest.fn()
    } as Partial<CompetenceService> as jest.Mocked<CompetenceService>;

    controller = new CompetenceController(mockCompetenceService);

    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();

    // Spy on the sequelize.transaction method so we can simulate its behavior.
    transactionSpy = jest
      .spyOn(mockedDb, 'transaction')
      .mockImplementation(async (callback: never) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return await callback();
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllCompetence', () => {
    it('should return 200 and competences in JSON response', async () => {
      // Arrange: Set up fake competences and override the internal competenceService.
      const fakeCompetences = [
        { competence_id: 1, name: 'Roller coaster operation' },
        { competence_id: 2, name: 'Ticket sales' }
      ] as Competence[];
      mockCompetenceService.getAllCompetences.mockResolvedValue(
        fakeCompetences
      );

      // Act: Call the controller method.
      await controller.getAllCompetence(req, res, next);

      // Assert: Verify transaction was used, the service method was called,
      // and the response was sent with status 200 and the competences.
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(
        controller['competenceService'].getAllCompetences
      ).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ competences: fakeCompetences });
    });

    it('should call next with error when an exception occurs', async () => {
      // Arrange: Simulate an error thrown from getAllCompetences.
      const error = new Error('Test error');
      mockCompetenceService.getAllCompetences.mockRejectedValue(error);

      // Act: Call the controller method.
      await controller.getAllCompetence(req, res, next);

      // Assert: Ensure the error is passed to the next function.
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
