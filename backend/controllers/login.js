import {  Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '#models/user.js';
import config from '#utils/config.js';

const loginRouter = new Router();

loginRouter.post('/', async (req, resp) => {
    const {username, password} = req.body;
    console.log(req.body);

    const user = await userModel.getByUsername(username);

    const isPasswordCorrect = user === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash);

    if (!(user && isPasswordCorrect)) {
        return resp.status(401).json({
            error: 'invalid username or password'
        });
    }

    const tokenConfig = {
        username,
        id: user.id
    };

    const token = jwt.sign(tokenConfig, config.SECRET);

    resp.status(200);
    resp.send({token, username, name: user.name});
});

export default loginRouter;