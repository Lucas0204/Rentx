import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

export async function ensureAdmin(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    const { user_id } = request;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user.isAdmin) {
        return response.status(401).json({
            error: 'Unauthorized!'
        });
    }

    return next();
}
