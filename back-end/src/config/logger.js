/*const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),

    new winston.transports.File({ filename: "combined.log", level: "info" }),
  ],
});
module.exports = logger;*/
const { createLogger, format, transports } = require("winston");
//const { Http } = require("winston/lib/winston/transports");
const { combine, timestamp, printf, colorize } = format;
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}]:${message}`;
});
const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
    new transports.File({ filename: "logs/combined.log" }),
    new transports.File({ filename: "logs/error.log" }),
  ],
});
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({
      filename: "logs/productions.log",
      level: "info",
    }),
    new transports.File({
      filename: "logs/productions.log",
      level: "error",
    })
  );
}
const requestLogger = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
};
module.exports = { logger, requestLogger };
