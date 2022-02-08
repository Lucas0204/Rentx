import 'dotenv/config';
import './database';
import './shared/containers';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { router } from './routes';
import swagger from 'swagger-ui-express';
import swaggerConfig from './swagger.json';
import { AppError } from './errors/AppError';

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
