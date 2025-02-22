import { Status } from "../models";
import { IStatusRepository } from "./contracts/IStatusRepository";

export class StatusRepository implements IStatusRepository{
   async getAllStatus(): Promise<Status[]> {
        return await Status.findAll();
    }
}