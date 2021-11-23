import config from './config.js';

const createConsoleOut = (method) => 
    (...params) =>
        config.NODE_ENV !== 'test' && console[method](...params);

const info = createConsoleOut('log');
const error = createConsoleOut('error');

export default {info, error};