import supertest from 'supertest';
import express from 'express';

import handleError from '#middlewares/error-handler.js';

export async function createTestApi(controller) {
    const app = express();
    
    app.use(express.json());

    app.use(controller);

    app.use((err,req, res, next)  => handleError(err,req, res, next));

    return supertest(app);
}
