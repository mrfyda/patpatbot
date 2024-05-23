import {createLogger, format, transports} from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.splat(),
        format.printf(({level, message, timestamp}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

export default logger;

