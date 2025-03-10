import { ApplicationService } from '../src/services/ApplicationService';
import { ApplicationRepository } from '../src/repositories/ApplicationRepository';
import { ApplicationDTO } from '../src/models/ApplicationDTO';
import { ApplicationDetailsDTO } from '../src/models/ApplicationDetailsDTO';
import Application from '../src/models/Application';
import { ConflictError } from '../src/errors/ConflictError';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let mockApplicationRepository: jest.Mocked<ApplicationRepository>;

  beforeEach(() => {
    mockApplicationRepository = {
      getAllApplications: jest.fn(),
      getApplicationDetailsById: jest.fn(),
      updateApplicationStatus: jest.fn()
    } as Partial<ApplicationRepository> as jest.Mocked<ApplicationRepository>;

    service = new ApplicationService(mockApplicationRepository);

    // Reset mocks between tests
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('getAllApplications', () => {
    it('should return all applications when repository resolves successfully', async () => {
      const applications = [
        { application_id: 1, name: 'Application One' },
        { application_id: 2, name: 'Application Two' }
      ] as ApplicationDTO[];
      // Simulate the repository successfully returning applications
      mockApplicationRepository.getAllApplications.mockResolvedValue(
        applications
      );

      const result = await service.getAllApplications();

      expect(result).toEqual(applications);
      expect(
        mockApplicationRepository.getAllApplications
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when repository rejects', async () => {
      const error = new Error('Database error');
      // Simulate the repository throwing an error
      mockApplicationRepository.getAllApplications.mockRejectedValue(error);

      await expect(service.getAllApplications()).rejects.toThrow(
        'Database error'
      );
      expect(
        mockApplicationRepository.getAllApplications
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('getApplicationDetailsById', () => {
    it('should return application details for a given id', async () => {
      const application_id = 1;
      const applicationDetails: ApplicationDetailsDTO = {
        application_id: 1,
        status: 'accepted'
      } as ApplicationDetailsDTO;

      mockApplicationRepository.getApplicationDetailsById.mockResolvedValue(
        applicationDetails
      );

      const serviceResponse =
        await service.getApplicationDetailsById(application_id);

      expect(serviceResponse).toBe(applicationDetails);
      expect(
        mockApplicationRepository.getApplicationDetailsById
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when repository rejects', async () => {
      const application_id = 1;
      const error = new Error('Database error');
      // Simulate the repository throwing an error
      mockApplicationRepository.getApplicationDetailsById.mockRejectedValue(
        error
      );

      await expect(
        service.getApplicationDetailsById(application_id)
      ).rejects.toThrow('Database error');
      expect(
        mockApplicationRepository.getApplicationDetailsById
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateApplicationStatus', () => {
    it('should update the application status when current status matches old_status_id', async () => {
      const applicationId = 1;
      const newStatusId = 2;
      const oldStatusId = 1;
      const applicationDetails = {
        application_id: applicationId,
        status_id: oldStatusId
      } as ApplicationDetailsDTO;

      mockApplicationRepository.getApplicationDetailsById.mockResolvedValue(
        applicationDetails
      );
      // Simulate successful status update
      const updateResult = {
        application_id: applicationId,
        status_id: newStatusId
      } as unknown as Application;
      mockApplicationRepository.updateApplicationStatus.mockResolvedValue(
        updateResult
      );

      const result = await service.updateApplicationStatus(
        applicationId,
        newStatusId,
        oldStatusId
      );

      expect(
        mockApplicationRepository.getApplicationDetailsById
      ).toHaveBeenCalledWith(applicationId);
      expect(
        mockApplicationRepository.updateApplicationStatus
      ).toHaveBeenCalledWith(applicationId, newStatusId);
      expect(result).toEqual(updateResult);
    });

    it('should throw ConflictError if the current application status does not match old_status_id', async () => {
      const applicationId = 1;
      const newStatusId = 2;
      const oldStatusId = 1;
      // Return an application with a different status_id to simulate a conflict
      const applicationDetails = {
        application_id: applicationId,
        status_id: 3
      } as ApplicationDetailsDTO;

      mockApplicationRepository.getApplicationDetailsById.mockResolvedValue(
        applicationDetails
      );

      await expect(
        service.updateApplicationStatus(applicationId, newStatusId, oldStatusId)
      ).rejects.toThrow(
        new ConflictError(
          'Application was updated by another user. Please refresh and try again.'
        )
      );

      expect(
        mockApplicationRepository.getApplicationDetailsById
      ).toHaveBeenCalledWith(applicationId);
      expect(
        mockApplicationRepository.updateApplicationStatus
      ).not.toHaveBeenCalled();
    });
  });
});
