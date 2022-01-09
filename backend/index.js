import  http from 'http';

import  app from './app.js';

import  logger from '#utils/logger.js';
import  config from '#utils/config.js';

const server = http.createServer(app);
server.listen(
    config.PORT,
    () => {
        logger.info(`Server running on port ${config.PORT}`);
    }
);
