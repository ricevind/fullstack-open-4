const mongoose = require('mongoose');

const {blogs} = require('../fixtures');
const {createTestApi, setDataBase}= require('../test-controller');
const {blogModel} = require('../../models'); 
// big oooppff: importing index that way evaluates all sub index files
const  blogsRouter  = require('../../controllers/blog'); 


describe.only('Blog controller', () => {
    let testedController;

    beforeEach( async () => {
        await setDataBase(blogModel, blogs);
        testedController = await createTestApi(blogsRouter);
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
            const blog = {
                title: 'Test Blog',
                author: 'An author',
                url: 'http://le.url.com',
                likes: 9999,
            };
    
            const blogResponse = await testedController
                .post('/')
                .send(blog)
                .set('Content-Type', 'application/json')
                .expect(201);
    
            expect(blogResponse.body).toMatchObject(blog);
    
    
            const blogsInDb = await testedController
                .get('/');
            
            expect(blogsInDb.body).toHaveLength(blogs.length + 1);
            expect(blogsInDb.body).toContainEqual(blogResponse.body);
            
        }, 10000);

        test('handles empty likes', async () => {
            const blog = {
                title: 'Test Blog',
                author: 'An author',
                url: 'http://le.url.com',
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