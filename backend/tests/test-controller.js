const supertest = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

const {config} = require('../utils');
const {handleError} = require('../middlewares');

async function createTestApi(controller) {
    const app = express();
    
    app.use(express.json());
    app.use('', controller);
    app.use(handleError);

    return supertest(app);
}

async function setDataBase(model, entities) {
    await  mongoose.connect(config.DATABASE_TEST_URI);
    await model.mongooseModel.deleteMany({});
    await Promise.all(entities.map(entity => {
        return model.add(entity);
    }));
}

module.exports = {createTestApi, setDataBase};