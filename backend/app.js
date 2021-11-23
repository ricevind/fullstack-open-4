import express  from 'express';
import mongoose  from 'mongoose';
import cors  from 'cors';

import logger from '#utils/logger.js'
import config from '#utils/config.js'

import unknownEndpoint from '#middlewares/unknown-endpoint.js'
import handleError from '#middlewares/error-handler.js'
import logRequest from '#middlewares/log-request.js'

import blogsRouter from '#controllers/blog.js'
import infoRouter from '#controllers/info.js'

logger.info('Connecting o MongoDB');
const databaseMap = {
    test: config.DATABASE_TEST_URI,
    development: config.DATABASE_URI,
    production: config.DATABASE_URI,
};

mongoose
    .connect(databaseMap[config.NODE_ENV])
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) =>
        logger.error('error connecting to MongoDB:', error.message)
    );

const app = express();

app.use(cors());
app.use(express.static('static'));
app.use(express.json());
app.use(logRequest);

app.use('/api/blog', blogsRouter);
app.use('/api/info', infoRouter);

app.use(unknownEndpoint);
app.use(handleError);

export default app;
