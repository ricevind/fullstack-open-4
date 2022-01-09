import  mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {type: String, required: 'Title must be provided' },
    author: {type: String, required: 'Author must be provided' },
    url:  {type: String, required: 'URL must be provided' },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'User id must be provided'
    }
});

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        const id = doc._id.toString();
        delete ret._id;
        delete ret.__v;
        return {...ret, id};
    }
});

const Blog = new mongoose.model('Blog', blogSchema);

function add({ title, author, url, likes = 0, userId }) {
    const blog = new Blog({ title, author, url, likes, user: userId });
    return blog.save();
}

function getBlogs() {
    return Blog.find({}).populate('user', {username: 1, name: 1});
}

function deleteBlog(id) {
    return Blog.findByIdAndDelete(id);
}

function deleteAll() {
    return Blog.deleteMany({});
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
    updateBlog,
    deleteAll
};
