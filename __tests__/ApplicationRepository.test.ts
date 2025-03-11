import { ApplicationRepository } from '../src/repositories/ApplicationRepository';
import Application from '../src/models/Application';
import { ApplicationDTO } from '../src/models/ApplicationDTO';
import { Person, Status } from '../src/models';

jest.mock('../src/models');
jest.mock('../src/repositories/PersonRepository');

describe('ApplicationRepository', () => {
  let repository: ApplicationRepository;

  beforeEach(() => {
    repository = new ApplicationRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('getAllApplications', () => {
    it('should return an array of ApplicationDTOs when findAll resolves with applications', async () => {
      // Sample ORM data that mimics what the Application.findAll() would return.
      const ormData = [
        {
          application_id: 1,
          person: {
            person_id: 10,
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com'
          },
          status: {
            status_name: 'accepted'
          }
        },
        {
          application_id: 2,
          person: {
            person_id: 20,
            name: 'Jane',
            surname: 'Smith',
            email: 'jane.smith@example.com'
          },
          status: {
            status_name: 'unhandled'
          }
        }
      ];

      // Spy on Application.findAll and have it resolve with the sample data.
      const findAllMock = jest
        .spyOn(Application, 'findAll')
        .mockImplementation(() => ormData as unknown as Promise<Application[]>);

      // Call the repository method.
      const result = await repository.getAllApplications();

      // Verify that Application.findAll was called with the correct query options.
      expect(findAllMock).toHaveBeenCalledWith({
        include: [
          {
            model: Person,
            attributes: ['person_id', 'name', 'surname', 'email']
          },
          {
            model: Status,
            attributes: ['status_name']
          }
        ]
      });

      // Verify that the returned data is properly mapped into ApplicationDTO instances.
      expect(result).toEqual([
        new ApplicationDTO(
          1,
          'John',
          'Doe',
          'john.doe@example.com',
          'accepted'
        ),
        new ApplicationDTO(
          2,
          'Jane',
          'Smith',
          'jane.smith@example.com',
          'unhandled'
        )
      ]);
      expect(result).toHaveLength(2);
      expect(findAllMock).toHaveBeenCalled();
    });

    it('should return an empty array when Application.findAll returns an empty array', async () => {
      // Spy on Application.findAll and have it resolve with an empty array.
      const findAllMock = jest
        .spyOn(Application, 'findAll')
        .mockResolvedValue([]);

      const result = await repository.getAllApplications();

      // Assert that the repository returns an empty array.
      expect(result).toEqual([]);
      expect(findAllMock).toHaveBeenCalled();
    });

    it('should propagate errors thrown by Application.findAll', async () => {
      // Create an error to simulate a database failure.
      const error = new Error('Database error');

      // Spy on Application.findAll and have it reject with the error.
      jest.spyOn(Application, 'findAll').mockRejectedValue(error);

      // Expect that calling getAllApplications() will reject with the error.
      await expect(repository.getAllApplications()).rejects.toThrow(error);
    });
  });
});
