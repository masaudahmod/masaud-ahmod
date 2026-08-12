// ======================================================
// redis.js
// Description: Redis client wrapper
// ======================================================

import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const client = createClient({ url: redisUrl });

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

try {
  await client.connect();
  console.log("Connected to Redis");
} catch (err) {
  console.error("Failed to connect to Redis:", err);
}

export default client;
