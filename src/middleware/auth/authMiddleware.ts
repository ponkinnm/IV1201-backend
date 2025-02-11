import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


//include user property for authentication
interface AuthRequest extends Request {
    user?: any;
}


// generate a new token for an authorized user
export const generateToken = (user: any) => {
    return jwt.sign(
        { 
            personId: user.person_id,
            username: user.username
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
};

// Makes sure that we have a valid token
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;  
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
        return;  
    }
};