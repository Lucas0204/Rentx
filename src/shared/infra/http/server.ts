import 'dotenv/config';
import createConnection from '@shared/infra/typeorm';
import '@shared/containers';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';

import express, { Request, Response, NextFunction } from 'express';

import { router } from './routes';
import swagger from 'swagger-ui-express';
import swaggerConfig from '../../../swagger.json';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: 'Error!',
        message: err.message
    });
})

app.listen(3333, () => console.log('Server running...'));
