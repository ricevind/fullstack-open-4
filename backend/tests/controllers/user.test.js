import mongoose from 'mongoose';

import userModel from '#models/user.js';
import userRouter from '#controllers/user.js';
import config from '#utils/config.js';

import users  from '../fixtures/users.js';
import {createTestApi} from '../test-controller.js';


describe.only('User controller', () => {
    let testedController;

    beforeAll(async () => {
        await  mongoose.connect(config.DATABASE_TEST_URI);
    }); 

    beforeEach( async () => {
        await userModel.mongooseModel.deleteMany({});

        await Promise.all(users.map(user => {
            return userModel.add(user);
        }));

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
                
            expect(userResponse.error).toBeDefined();
        }, 10000);

        describe('validates password', () => {
            test('is present', async () => {
                const user = {
                    username: 'Ricevind',
                    name: 'Michal',
                    blogs: [],
                };
        
                const userResponse = await testedController
                    .post('/')
                    .send(user)
                    .set('Content-Type', 'application/json')
                    .expect(400);

                expect(userResponse.error.text.toLowerCase()).toContain('password');
            }, 10000);

            test('is present', async () => {
                const user = {
                    username: 'Ricevind',
                    name: 'Michal',
                    blogs: [],
                    password: 'ab',
                };
        
                const userResponse = await testedController
                    .post('/')
                    .send(user)
                    .set('Content-Type', 'application/json')
                    .expect(400);

                expect(userResponse.error.text).toContain('3');
            }, 10000);
        });

        describe('validates username', () => {
            test('is present', async () => {
                const user = {
                    name: 'Michal',
                    blogs: [],
                    password: 'test12345',
                };
        
                const userResponse = await testedController
                    .post('/')
                    .send(user)
                    .set('Content-Type', 'application/json')
                    .expect(400);

                expect(userResponse.error.text).toContain('username');
            }, 10000);

            test('is present', async () => {
                const user = {
                    username: 'ab',
                    name: 'Michal',
                    blogs: [],
                    password: 'test12345',
                };
        
                const userResponse = await testedController
                    .post('/')
                    .send(user)
                    .set('Content-Type', 'application/json')
                    .expect(400);

                expect(userResponse.error.text).toContain('3');
            }, 10000);
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});