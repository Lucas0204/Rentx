import 'dotenv/config';
import './database';
import './shared/containers';

import express from 'express';

import { router } from './routes';
import swagger from 'swagger-ui-express';
import swaggerConfig from './swagger.json';

const app = express();

app.use(express.json());
app.use(router);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));

app.listen(3333, () => console.log('Server running...'));
