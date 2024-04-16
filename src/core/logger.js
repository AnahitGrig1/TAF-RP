import { createLogger, format, Logger, transports } from 'winston';

const alignColorsAndTime = format.combine(
    format.colorize({
        all: true
    }),
    format.label({
        label: '[LOGGER]'
    }),
    format.timestamp({
        format: 'YY-MM-DD HH:mm:ss'
    }),
    format.printf(
        (info) =>
            `[${info.namespace}]  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

const getLogger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), alignColorsAndTime)
        })
    ]
});

export const logger = (namespace = 'LOGGER') =>
    getLogger.child({ namespace });

export const log = logger();
