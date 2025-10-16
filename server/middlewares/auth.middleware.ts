import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Check for token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your secret
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
            
            // Attach the user payload to the request object
            // You can optionally fetch the full user from the DB here
            req.user = decoded; 

            // Move to the next middleware/route handler
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // This middleware should run AFTER the 'protect' middleware
    const userPayload = req.user as JwtPayload;

    if (!userPayload || !userPayload.role) {
      return res.status(403).json({ message: "Forbidden: User role not specified in token." });
    }

    const isAllowed = allowedRoles.includes(userPayload.role);

    if (!isAllowed) {
      return res.status(403).json({ message: `Forbidden: Access denied for role '${userPayload.role}'.` });
    }

    next(); // User has the required role, proceed
  };
}