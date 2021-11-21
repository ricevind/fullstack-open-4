const config = require('./config');

const createConsoleOut = (method) => 
    (...params) =>
        config.NODE_ENV !== 'test' && console[method](...params);

const info = createConsoleOut('log');
const error = createConsoleOut('error');


module.exports = {
    info, error
};
