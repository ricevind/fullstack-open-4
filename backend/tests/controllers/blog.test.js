import mongoose  from 'mongoose';

import blogModel  from '#models/blog.js';
import createBlogRouter  from '#controllers/blog.js';
import userModel from '#models/user.js';
import config from '#utils/config.js';

import users  from '../fixtures/users.js';
import blogs  from '../fixtures/blogs.js';
import { createTestApi } from '../test-controller.js';

let user;
const mockAuthorize = (req, _, next) => {
    if (!user) {
        throw new Error('need to call setMockUser first');
    }
    req.user = user;
    next();
};

describe('Blog controller', () => {
    let testedController;
    let blogsWithUserId;
    let userId;

    beforeAll(async () => {
        await  mongoose.connect(config.DATABASE_TEST_URI);
    }); 

    beforeEach( async () => {
        await userModel.mongooseModel.deleteMany({});
        await blogModel.mongooseModel.deleteMany({});

        user = (await userModel.add(users[0])).toJSON();
        userId = user.id;
        blogsWithUserId = blogs(userId);

        await Promise.all(blogsWithUserId.map(blog => {
            return blogModel.add(blog);
        }));

        testedController = await createTestApi(createBlogRouter(mockAuthorize));
    });

    test('Method: Get /', async () => {
        const response = await testedController
            .get('/')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        
        expect(response.body).toHaveLength(6);
        expect(typeof response.body[0].id).toEqual('string');
    }, 10000);



    describe('Method: POST /', () => {
        test('creates blog', async () => {
            const blogCandidate = {
                title: 'Test Blog',
                author: 'An author',
                url: 'http://le.url.com',
                userId,
                likes: 9999,
            };

            const expectedBlog = {
                ...blogCandidate
            };
            delete expectedBlog.userId;


    
            const blogResponse = await testedController
                .post('/')
                .send(blogCandidate)
                .set('Content-Type', 'application/json')
                .expect(201);
    
            expect(blogResponse.body).toMatchObject(expectedBlog);
    
    
            const blogsInDb = await testedController
                .get('/');
            
            expect(blogsInDb.body).toHaveLength(blogsWithUserId.length + 1);
            expect(blogsInDb.body).toEqual(expect.arrayContaining([expect.objectContaining({...expectedBlog, id: blogResponse.body.id})]));
            
        }, 10000);

        test('handles empty likes', async () => {
            const blog = {
                title: 'Test Blog',
                author: 'An author',
                url: 'http://le.url.com',
                userId,
            };
    
            const blogResponse = await testedController
                .post('/')
                .send(blog)
                .set('Content-Type', 'application/json')
                .expect(201);
    
            expect(blogResponse.body.likes).toEqual(0);
        }, 10000);

        test('validates title', async () => {
            const blog = {
                author: 'An author',
                url: 'http://le.url.com',
                userId,
            };
    
            await testedController
                .post('/')
                .send(blog)
                .set('Content-Type', 'application/json')
                .expect(400);
        }, 10000);

        test('validates url', async () => {
            const blog = {
                author: 'An author',
                title: 'test title',
                userId,
            };
    
            await testedController
                .post('/')
                .send(blog)
                .set('Content-Type', 'application/json')
                .expect(400);
        }, 10000);
    });

   

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
