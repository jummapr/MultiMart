import { Redis } from "ioredis";

export const getRedisUrl = () => {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error("REDIS_URL is not set");
  }
  return redisUrl;
};

export const redis = new Redis(getRedisUrl());