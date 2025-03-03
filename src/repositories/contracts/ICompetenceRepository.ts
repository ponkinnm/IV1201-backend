import { Competence } from '../../models';

export interface ICompetenceRepository {
  getAllCompetence(): Promise<Competence[]>;
}
