"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.getRedisUrl = void 0;
const ioredis_1 = require("ioredis");
const getRedisUrl = () => {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        throw new Error("REDIS_URL is not set");
    }
    return redisUrl;
};
exports.getRedisUrl = getRedisUrl;
exports.redis = new ioredis_1.Redis((0, exports.getRedisUrl)());
//# sourceMappingURL=redis.js.map