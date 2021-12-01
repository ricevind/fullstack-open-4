import supertest from 'supertest';
import express from 'express';

import handleError from '#middlewares/error-handler.js';

export  function createTestApi(controller) {
    const app = express();
    
    app.use(express.json());
    app.use(controller);
    app.use(handleError);

    return supertest(app);
}
