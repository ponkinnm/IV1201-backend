import { CompetenceProfile } from '../../models';
import { CompetenceProfileDTO } from '../../models/CompetenceProfileDTO';

export interface ICompetenceProfileRepository {
  getCompetenceProfileById(person_id: number): Promise<CompetenceProfileDTO[]>;
  addNewCompetenceProfile(
    person_id: number,
    competences: Array<{ competence_id: number; years_of_experience: number }>
  ): Promise<CompetenceProfile[]>;
}
