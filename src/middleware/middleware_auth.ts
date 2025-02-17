import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';




// Typescript wants us to declare the global namespace for Express???
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.accessToken;


  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
}
