import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';
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
        const { sub: user_id } = verify(token, auth.refresh_token_secret) as IPayload;
        
        const usersTokenRepository = new UsersTokenRepository();

        const user = await usersTokenRepository.findOne({
            user_id,
            refresh_token: token
        });

        if (!user) {
            return response.status(401).json({
                error: 'User does not exists!'
            });
        }

        request.user_id = user.id;

        return next();
    } catch {
        return response.status(401).json({
            error: 'Invalid token!'
        });
    }
}
