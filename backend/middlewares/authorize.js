import jwt from 'jsonwebtoken';

import config from '#utils/config.js';
import userModel from '#models/user.js';


const authorize = async (req, resp, next) => {
    const token = req.token;

    const decodedToken = jwt.verify(token, config.SECRET);
    
    if (!(token && decodedToken.id)) {
        return resp
            .status(401)
            .send({error: 'invalid or missing token'});
    }

    const user = await userModel.getById(decodedToken.id);

    if (!user) {
        return resp
            .status(401)
            .send({error: 'user not found'});
    }

    req.user = user;
    next();
};   

export default authorize;