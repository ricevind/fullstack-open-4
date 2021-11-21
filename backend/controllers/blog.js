const Router = require('express').Router;
const blogRouter = new Router();

const { blogModel } = require('../models');

blogRouter.get('/', async (_, res) => {
    const blogs = await blogModel.getBlogs();
    res.json(blogs);
});

blogRouter.post('/', async (req, res, next) => {
    const blogCandidate = req.body;
    try {
        const blog = await blogModel.add(blogCandidate);
        res.status(201);
        res.json(blog);
    } catch (e) {
        next(e);
    }
   
});

blogRouter.delete('/:id', async (req, res, next) => {
    const blogId = req.params.id;
    try {
        const q = await blogModel.deleteBlog(blogId);
        if (q == null) {
            res.statusMessage = 'Blog not found';
            res.status(204);
            res.send();
            return;
        }

        res.status(200);
        res.send();
    } catch (e) {
        next(e);
    }
});

blogRouter.patch('/:id', async (req, res, next) => {
    const blogId = req.params.id;
    const blogUpdate = req.body;

    try {
        const updatedBlog = await blogModel.updateBlog(blogId, blogUpdate);
        if (updatedBlog == null) {
            res.statusMessage = 'Blog not found';
            res.status(204);
            res.send();
            return;
        }
        res.json(updatedBlog);
    } catch (e) {
        next(e);
    }
});

module.exports = blogRouter;
