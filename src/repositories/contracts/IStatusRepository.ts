import { Status } from '../../models';

export interface IStatusRepository {
  getAllStatus(): Promise<Status[]>;
}
