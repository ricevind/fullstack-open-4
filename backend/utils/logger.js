import config from './config.js';

const createConsoleOut = config.NODE_ENV !== 'test' ? (method) => 
    (...params) =>
        console[method](...params) : () => {};

const info = createConsoleOut('log');
const error = createConsoleOut('error');

export default {info, error};