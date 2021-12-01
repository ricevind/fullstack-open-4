import logger from '#utils/logger.js';

function handleError(error, req, res, next) {
    logger.error(error);
    console.log('eeeeee')
    console.log(error)
    
    if (error.name === 'CastError') {
        return res.status(400).send({ error: error.message});
    }

    if (error.name === 'ValidationError') {
        console.error(JSON.stringify(error, null, 2));
        return res.status(400).send({ error: error.message });
    }

    next(error);
}

export default handleError;
