import { Router } from "express";

import commentModel from "#models/comment.js";

const commentRouter = new Router();

function createCommentRouter(authorizeMiddleware) {
  commentRouter.get("/:id/comments", authorizeMiddleware, async (req, res) => {
    const blogId = req.params.id;
    const comments = await commentModel.getCommentsForBlog(blogId);
    res.json(comments);
  });

  commentRouter.post("/:id/comments", authorizeMiddleware, async (req, res) => {
    const commentCandidate = { ...req.body, blogId: req.params.id };
    const comment = await commentModel.add(commentCandidate);

    res.status(201);
    res.json(comment);
  });

  return commentRouter;
}

export default createCommentRouter;
