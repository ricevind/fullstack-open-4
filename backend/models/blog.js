import  mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {type: String, required: 'Title must be provided' },
    author: {type: String, required: 'Author must be provided' },
    url:  {type: String, required: 'URL must be provided' },
    likes: Number,
});

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        const id = doc._id.toString();
        delete ret._id;
        return {...ret, id};
    }
});

const Blog = new mongoose.model('Blog', blogSchema);

function add({ title, author, url, likes = 0 }) {
    const blog = new Blog({ title, author, url, likes });
    return blog.save();
}

function getBlogs() {
    return Blog.find({});
}

function deleteBlog(id) {
    return Blog.findByIdAndDelete(id);
}

function updateBlog(id, blogUpdate) {
    return Blog.findByIdAndUpdate(
        id, 
        blogUpdate, 
        {new: true, runValidators: true}
    );
}

export default {
    mongooseModel: Blog,
    add,
    getBlogs,
    deleteBlog,
    updateBlog
};
