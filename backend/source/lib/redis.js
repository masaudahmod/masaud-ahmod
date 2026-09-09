// ======================================================
// redis.js
// Description: Redis client wrapper
// ======================================================

import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://default:fK5vHVL6nPcUCVNrqj7hZlsMGNeVmsOv@redis-13083.crce286.ap-south-1-1.ec2.cloud.redislabs.com:13083";

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
