const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { logger, config } = require('./utils');
const { unknownEndpoint, handleError, logRequest } = require('./middlewares');
const { blogsRouter, infoRouter } = require('./controllers');

logger.info('Connecting o MongoDB');
const databaseMap = {
    test: config.DATABASE_TEST_URI,
    development: config.DATABASE_URI,
    production: config.DATABASE_URI,
};

mongoose.connect(databaseMap[config.NODE_ENV])
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.error(
        'error connecting to MongoDB:', error.message)
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

module.exports = app;
