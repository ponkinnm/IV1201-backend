import { IApplicationRepository } from "../repositories/contracts/IApplicationRepository";
import jwt from 'jsonwebtoken';
 import { generateToken } from '../middleware/auth/authMiddleware';




export class ApplicationService {
    private applicationRepository: IApplicationRepository;

    constructor(applicationRepository: IApplicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    async getAllApplications() {
        try {
            return await this.applicationRepository.getAllApplications();
        } catch (err) {
            console.error(err);
            throw new Error('Failed to get applications');
        }
    }

    async login(username: string, password: string) {
        try {
            if (!username || !password) {
                throw new Error('Username and password required');
            }
    
            const user = await this.applicationRepository.findUser(username, password);
            
            if (!user) {
                throw new Error('Invalid credentials');
            }
    
            const token = generateToken(user);
    
            return {
                token,
                user: {
                    personId: user.person_id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                }
            };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    
}