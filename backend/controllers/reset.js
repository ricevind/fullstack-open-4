import { Router } from 'express';

import blogModel  from '#models/blog.js';
import userModel from '#models/user.js';

const resetRouter = new Router();

resetRouter.post('/', async (_, res) => {
    await blogModel.deleteAll();
    await userModel.deleteAll();

    res.sendStatus(200);
});

export default resetRouter;
