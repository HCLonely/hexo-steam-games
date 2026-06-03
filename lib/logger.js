'use strict';

const hexoLog = require('hexo-log');

const createLogger = typeof hexoLog === 'function' ? hexoLog : hexoLog.default;

module.exports = createLogger({
    debug: false,
    silent: false
});
