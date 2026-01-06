import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize Redis connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 2. Define the Rate Limit Policy
// Allows 10 requests every 10 seconds per IP address
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "10 s"),
  analytics: true, // Optional: view stats in Upstash console
});

export const rateLimitMiddleware = async (req, res, next) => {
  try {
    // Use the user's IP address as the unique identifier
    const identifier = req.ip || "127.0.0.1"; 
    // const identifier = "my-limit-key";

    console.log("this is ip address of user: ",identifier);
    
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

    // 3. Set standard professional headers
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
        retryAfter: reset,
      });
    }

    next();
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    next(); // Fail open: allow request if Redis fails
  }
};