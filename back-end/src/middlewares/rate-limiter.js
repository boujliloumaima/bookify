const rateLimit = require("express-rate-limit");
const { logger } = require("../config/logger");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Trop de requêtes, réessayez plus tard.",

  handler: (req, res, next, options) => {
    logger.warn(
      `Rate limit atteint pour l'IP : ${req.ip} - URL : ${req.originalUrl}`
    );
    res.status(options.statusCode).json({ message: options.message });
  },
});

module.exports = limiter;
