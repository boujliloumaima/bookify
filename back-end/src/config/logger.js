/*const { createLogger, format, transports } = require("winston");
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
      filename: "logs/production-info.log",
      level: "info",
    })
  );

  logger.add(
    new transports.File({
      filename: "logs/production-error.log",
      level: "error",
    })
  );
}
const requestLogger = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
};
module.exports = { logger, requestLogger };*/
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;
const fs = require("fs");

// Vérifier si le dossier "logs" existe
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

// Format personnalisé
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
});

// Filtrer uniquement les erreurs
const errorFilter = format((info) => {
  return info.level === "error" ? info : false;
});

// Filtrer uniquement les infos et warnings
const infoFilter = format((info) => {
  return info.level !== "error" ? info : false;
});

// Création du logger
const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
    // Fichier pour toutes les infos sauf les erreurs
    new transports.File({
      filename: "logs/combined.log",
      format: combine(
        infoFilter(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
      ),
    }),
    // Fichier pour les erreurs seulement
    new transports.File({
      filename: "logs/error.log",
      format: combine(
        errorFilter(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
      ),
    }),
  ],
});

// Ajouter en production
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({
      filename: "logs/production-info.log",
      level: "info",
    })
  );

  logger.add(
    new transports.File({
      filename: "logs/production-error.log",
      level: "error",
    })
  );
}

// Middleware pour logger les requêtes HTTP
const requestLogger = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
};

module.exports = { logger, requestLogger };
