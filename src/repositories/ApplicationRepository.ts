import { IApplicationRepository } from "./contracts/IApplicationRepository";
import pool from '../config/dbsetup';
import { Application } from "../models/Application";

export class ApplicationRepository implements IApplicationRepository {
    async getAllApplications() {
        const query = `
    SELECT 
      p.person_id,
      p.name,
      p.surname,
      p.email,
      s.status_name
    FROM public.person p
    LEFT JOIN public.application a ON p.person_id = a.person_id
    LEFT JOIN public.status s ON a.status_id = s.status_id
  `;
        const result = await pool.query<Application>(query);
        return result.rows;
    };
}