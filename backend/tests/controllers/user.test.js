import mongoose from 'mongoose';

import userModel from '#models/user.js';
import userRouter from '#controllers/user.js';

import users  from '../fixtures/users.js';
import {createTestApi, setDataBase} from '../test-controller.js';


describe.only('User controller', () => {
    let testedController;

    beforeEach( async () => {
        await setDataBase([[userModel, users]]);
        testedController = await createTestApi(userRouter);
    });

    
    describe('Method: POST /', () => {
        test('creates user', async () => {
            const userInput = {
                'name': 'Karo',
                'username': 'Ayumi',
                'password': '12345678'
            };

            const userOutput = {
                name: userInput.name,
                username: userInput.username
            };
    
            const userResponse = await testedController
                .post('/')
                .send(userInput)
                .set('Content-Type', 'application/json')
                .expect(201);
    
            expect(userResponse.body).toMatchObject(userOutput);
    
    
            const usersInDb = await userModel.mongooseModel.find({}).then(users => users.map(user => user.toJSON()));
                
            
            expect(usersInDb).toHaveLength(users.length + 1);
            expect(usersInDb).toContainEqual(userResponse.body);
            
        }, 10000);

        test('handles duplicate username', async () => {
           
    
            const userResponse = await testedController
                .post('/')
                .send(users[0])
                .set('Content-Type', 'application/json')
                .expect(400);
            expect(userResponse.body.likes).toEqual(0);
        }, 10000);

        // test('validates title', async () => {
        //     const user = {
        //         author: 'An author',
        //         url: 'http://le.url.com',
        //     };
    
        //     await testedController
        //         .post('/')
        //         .send(user)
        //         .set('Content-Type', 'application/json')
        //         .expect(400);
        // }, 10000);

        // test('validates url', async () => {
        //     const user = {
        //         author: 'An author',
        //         title: 'test title',
        //     };
    
        //     await testedController
        //         .post('/')
        //         .send(user)
        //         .set('Content-Type', 'application/json')
        //         .expect(400);
        // }, 10000);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});