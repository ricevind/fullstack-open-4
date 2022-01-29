import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: "Content must be provided" },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: "Blog id must be provided",
  },
});

commentSchema.set("toJSON", {
  transform: (doc, ret) => {
    const id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return { ...ret, id };
  },
});

const Comment = new mongoose.model("Comment", commentSchema);

function add({ content, blogId }) {
  const comment = new Comment({ content, blog: blogId });
  return comment.save();
}

function getCommentsForBlog(blogId) {
  return Comment.find({ blog: blogId });
}

export default {
  mongooseModel: Comment,
  add,
  getCommentsForBlog,
};
