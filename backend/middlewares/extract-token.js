function getToken(req) {
    const prefix = 'bearer ';
    const authorizationHeader = req.get('authorization');
    
    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith(prefix))  {
        return authorizationHeader.substring(prefix.length);
    }

    return null;
}

const extractToken = async (req, resp, next) => {
    const token = getToken(req);

    req.token = token;
    next();
};   

export default extractToken;