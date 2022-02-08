import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: 'Unauthorized!'
        });
    }

    const token = authToken.split(' ')[1];

    try {
        const { sub: user_id } = verify(token, process.env.JWT_SECRET);
        
        return next();
    } catch {
        return response.status(401).json({
            error: 'Invalid token!'
        });
    }
}
