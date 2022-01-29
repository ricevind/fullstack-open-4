import express  from 'express';
import mongoose  from 'mongoose';
import cors  from 'cors';

import logger from '#utils/logger.js';
import config from '#utils/config.js';

import unknownEndpoint from '#middlewares/unknown-endpoint.js';
import handleError from '#middlewares/error-handler.js';
import logRequest from '#middlewares/log-request.js';
import extractToken from '#middlewares/extract-token.js';
import authorize from '#middlewares/authorize.js';


import createBlogRouter from "#controllers/blog.js";
import createCommentRouter from "#controllers/comment.js";
import infoRouter from "#controllers/info.js";
import createUserRouter from "#controllers/user.js";
import loginRouter from "#controllers/login.js";
import resetRouter from "#controllers/reset.js";

logger.info("Connecting o MongoDB");
const databaseMap = {
  test: config.DATABASE_TEST_URI,
  development: config.DATABASE_URI,
  production: config.DATABASE_URI,
};

mongoose
  .connect(databaseMap[config.NODE_ENV])
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) =>
    logger.error("error connecting to MongoDB:", error.message)
  );

const app = express();

app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(extractToken);
app.use(logRequest);

if (config.NODE_ENV === "test") {
  console.log("hello reset");
  app.use("/api/testing/reset", resetRouter);
}
app.use("/api/blogs", createBlogRouter(authorize));
app.use("/api/blogs", createCommentRouter(authorize));
app.use("/api/info", infoRouter);
app.use("/api/users", createUserRouter(authorize));
app.use('/api/login', loginRouter);


app.use(unknownEndpoint);
app.use(handleError);

export default app;
