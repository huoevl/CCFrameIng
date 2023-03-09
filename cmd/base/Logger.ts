import * as log4js from "log4js";
log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[ %d{hh:mm:ss} %p %C %] %m'
            }
        },
    },
    categories: {
        default: {
            appenders: ['console'],
            enableCallStack: false,
            level: 'INFO',
        },
    },
});
let log = log4js.getLogger();
log.level = "all";
export let logger = log;