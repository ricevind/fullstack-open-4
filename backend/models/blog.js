const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = new mongoose.model('Blog', blogSchema);

function addBlog({ title, author, url, likes }) {
    const blog = new Blog({ title, author, url, likes });
    return blog.save();
}

function getBlogs() {
    return Blog.find({});
}

module.exports = {
    addBlog,
    getBlogs,
};
