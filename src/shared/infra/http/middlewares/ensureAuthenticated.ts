import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: 'Unauthorized!'
        });
    }

    const token = authToken.split(' ')[1];

    try {
        const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;
        
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

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
