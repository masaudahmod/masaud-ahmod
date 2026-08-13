import ApiError from "../errors/apiError.js";
import redisClient from "../lib/redis.js";

const defaultKey = (req) => `rl:${req.ip}:${req.originalUrl}`;

const rateLimiter = ({ limit = 5, windowSec = 60, keyGenerator = defaultKey } = {}) => {
  return async (req, res, next) => {
    try {
      const key = keyGenerator(req);
      const current = await redisClient.incr(key);
      if (current === 1) {
        await redisClient.expire(key, windowSec);
      }

      const remaining = Math.max(limit - current, 0);
      res.setHeader("X-RateLimit-Limit", String(limit));
      res.setHeader("X-RateLimit-Remaining", String(remaining));

      let ttl = await redisClient.ttl(key);
      if (ttl < 0) ttl = windowSec; // fallback
      res.setHeader("X-RateLimit-Reset", String(Date.now() + ttl * 1000));

      if (current > limit) {
        return next(new ApiError(429, "Too many requests, please try again later."));
      }

      next();
    } catch (err) {
      console.error("Rate limiter error:", err);
      // Fail-open: allow request when Redis is not available
      next();
    }
  };
}; 

export default rateLimiter;
