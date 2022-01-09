import logger from '#utils/logger.js';

function handleError(error, req, res, next) {
    logger.error(error);
    
    if (error.name === 'CastError') {
        res.status(400);
        res.json({ message: error.message });

        return;
    }

    if (error.name === 'ValidationError') {
        res.status(400);
        res.json({ message: error.message });

        return;
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        });
    }

    next(error);
}

export default handleError;
