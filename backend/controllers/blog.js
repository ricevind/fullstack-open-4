import { Router } from 'express';

import blogModel from '#models/blog.js';
import userModel from '#models/user.js';

const blogRouter = new Router();

blogRouter.get('/', async (_, res) => {
    const blogs = await blogModel.getBlogs();
    res.json(blogs);
});

blogRouter.delete('/:id', async (req, res, ) => {
    const blogId = req.params.id;
    const q = await blogModel.deleteBlog(blogId);
    if (q == null) {
        res.statusMessage = 'Blog not found';
        res.status(204);
        res.send();
        return;
    }

    res.status(200);
    res.send();
   
});

blogRouter.patch('/:id', async (req, res, ) => {
    const blogId = req.params.id;
    const blogUpdate = req.body;

    const updatedBlog = await blogModel.updateBlog(blogId, blogUpdate);
    if (updatedBlog == null) {
        res.statusMessage = 'Blog not found';
        res.status(204);
        res.send();
        return;
    }
    res.json(updatedBlog);
});

function createBlogRouter(authorizeMiddleware) {
    blogRouter.post(
        '/',
        authorizeMiddleware,
        async (req, res) => {
    
            const blogCandidate = {...req.body, userId: req.user.id};
            const blog = await blogModel.add(blogCandidate);
           
            await userModel.addBlogToUser({userId: blogCandidate.userId, blogId: blog.id});
            res.status(201);
            res.json(blog);
        });

    return blogRouter;
}

export default createBlogRouter;
