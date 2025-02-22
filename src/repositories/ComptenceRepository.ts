import { Competence } from "../models";
import { ICompetenceRepository } from "./contracts/ICompetenceRepository";

export class CompetenceRepository implements ICompetenceRepository{

   async getAllCompetence(): Promise<Competence[]> {
        const competence =  await Competence.findAll();
        return competence;
    }
}