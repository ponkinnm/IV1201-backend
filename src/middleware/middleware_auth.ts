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

/**
 * Authentication middleware for Express routes.
 * Verifies JWT tokens from cookies and attaches the user information to the request object.
 * This middleware should be applied to routes that require the user to be authenticated
 */
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
