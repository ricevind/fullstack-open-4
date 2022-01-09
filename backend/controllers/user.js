import { Router } from 'express';
import bcrypt from 'bcrypt';

import userModel from '#models/user.js';

const userRouter = new Router();

userRouter.post('/', async(request, response, next) => {
    const body = request.body;

    if (!('password' in body) || body.password.length < 3) {
        response.status(400);
        response.json({
            error: 'Password is required and of minimum length = 3'
        });
        return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    try {

        const newUser = await userModel.add({
            name: body.name,
            username: body.username,
            passwordHash
        });

        response.status(201);
        response.json(newUser);

    } catch (e ) {
        next(e);
    }
});

userRouter.get('/', async(request, response) => {
    const users = await userModel.all();

    response.json(users);
});

export default userRouter;
