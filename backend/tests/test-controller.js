import supertest from 'supertest';
import express from 'express';
import mongoose from 'mongoose';

import config from '../utils/config.js';
import handleError from '../middlewares/error-handler.js';

export async function createTestApi(controller) {
    const app = express();
    
    app.use(express.json());
    app.use('', controller);
    app.use(handleError);

    return supertest(app);
}

export async function setDataBase(model, entities) {
    await  mongoose.connect(config.DATABASE_TEST_URI);
    await model.mongooseModel.deleteMany({});
    await Promise.all(entities.map(entity => {
        return model.add(entity);
    }));
}
