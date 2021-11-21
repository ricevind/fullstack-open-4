const logger = require('../utils/logger');

function handleError(error, req, res, next) {
    logger.error(error);
    
    if (error.name === 'CastError') {
        return res.status(400).send({ error: error.message});
    }

    if (error.name === 'ValidationError') {
        console.error(JSON.stringify(error, null, 2));
        return res.status(400).send({ error: error.message });
    }

    next(error);
}

module.exports = handleError;
