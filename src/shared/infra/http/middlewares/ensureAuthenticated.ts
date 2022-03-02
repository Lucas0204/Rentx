import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: 'Unauthorized!'
        });
    }

    const token = authToken.split(' ')[1];

    try {
        const { sub: user_id } = verify(token, auth.jwt.secret) as IPayload;

        request.user_id = user_id;

        return next();
    } catch {
        return response.status(401).json({
            error: 'Invalid token!'
        });
    }
}
