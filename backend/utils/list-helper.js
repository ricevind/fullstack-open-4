const {chain, sumBy} = require('lodash');

const dummy = () => {
    return 1;
};

const totalLikes = (blogsCollection) => {
    return blogsCollection.reduce(
        (likes, blog) => likes + blog.likes,
        0
    );
};

const favoriteBlog = (blogsCollection) => {
    const mostLikedBlog =  blogsCollection.reduce(
        (mostLikedBlog, blog) => {
            if (!mostLikedBlog) {
                return blog;
            }
            return blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog;
        },
        null
    ); 

    if (mostLikedBlog) {
        const {title, author, likes} = mostLikedBlog;
        return {title, author, likes};
    } 

    return mostLikedBlog;
};

const mostBlogs = (blogsCollection) => {
    const maxAuthor = chain(blogsCollection)
        .countBy('author')
        .entries()
        .maxBy(([, val]) => val)
        .value();

    if (maxAuthor) {
        const [author, blogs] = maxAuthor;
        return {author, blogs};
    }

    return null;
};

const mostLikes = (blogsCollection) => {
    const maxAuthor = chain(blogsCollection)
        .groupBy('author')
        .mapValues(blogs => sumBy(blogs, 'likes'))
        .entries()
        .maxBy(([, val]) => val)
        .value();

    if (maxAuthor) {
        const [author, likes] = maxAuthor;
        return {author, likes};
    }

    return null;
};

module.exports = { 
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs,
    mostLikes 
};