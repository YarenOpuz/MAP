const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Çok fazla istek gönderdiniz. Lütfen bir süre sonra tekrar deneyin.',
});

module.exports = limiter;
