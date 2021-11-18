const blogRouter = new require('express').Router();

const { blogModel } = require('../models');

blogRouter.get('/', (_, res) => {
    blogModel.getBlogs().then(blogs => res.json(blogs));
});

blogRouter.post('/', (req, res, next) => {
    const blogCandidate = req.body;

    blogModel.addBlog(blogCandidate).then(blog => {
        res.status(201);
        res.json(blog);
    }).catch(e => next(e));
});

module.exports = blogRouter;
