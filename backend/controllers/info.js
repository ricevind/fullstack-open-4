const infoRouter = new require('express').Router();
const { blogModel } = require('../models');

infoRouter.get('/', (_, res) => {
    blogModel.getBlogs().then(blog => {
        const message = `Blogs has info for ${blog.length} blogs`;
        const date = (new Date()).toLocaleString('pl-PL', { dateStyle: 'full', timeStyle: 'long' });
        const info = `${message}\n\r${date}`;

        res.send(info);
    });
});

module.exports = infoRouter;
