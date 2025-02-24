export class CompetenceProfileDTO{
    competence_name: string;
    years_of_experience: number;



    constructor(competence_name:string, years_of_experience:number){
        this.competence_name = competence_name;
        this.years_of_experience = years_of_experience;

    }
}