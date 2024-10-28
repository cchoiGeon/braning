import winston from 'winston';
import dotenv from 'dotenv';
import 'winston-daily-rotate-file';
dotenv.config();

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YY.MM.DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            createSymlink: true,
            symlinkName: 'curr.log'
        })
    ],
});

if (process.env.MODE === 'dev') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(info => `${info.level}: ${info.message}`)
        )
    }));
}

export default logger;
