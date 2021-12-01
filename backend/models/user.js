import  mongoose from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;

        return returnedObject;
    }
});

const User = mongoose.model('User', userSchema);


async function add({username, name, passwordHash, blogs = []}) {
    const user = new User({username, name, passwordHash, blogs});

    return user.save();
}

async function all() {
    return User.find({}).populate('blogs', {title: 1 , likes: 1});
}

async function addBlogToUser({userId, blogId}) {
    const user = await User.findById(userId);
    user.blogs = user.blogs.concat(blogId);
    return user.save();
}

export default {
    mongooseModel: User,all,addBlogToUser,
    add};
