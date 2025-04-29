const rateLimit = require("express-rate-limit");
const { logger } = require("../config/logger");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Trop de requêtes, réessayez plus tard.",

  handler: (req, res, options) => {
    logger.warn(
      `Rate limit atteint pour l'IP : ${req.ip} - URL : ${req.originalUrl}`
    );
    res.status(options.statusCode).json({ message: options.message });
  },
});

module.exports = limiter;
