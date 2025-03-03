import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PersonDTO } from '../models/PersonDTO';

/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Express {
    interface Request {
      user?: PersonDTO;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

// an alternative is to move this into its own file and export it as a module eg. express.d.ts

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // Cast the decoded token to PersonDTO
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as PersonDTO;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
