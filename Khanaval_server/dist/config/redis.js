import { Redis } from "ioredis";
export const redisclient = new Redis("rediss://default:AXRNAAIncDI2NmRiOWIwNDdjYjg0ZjNjYTQwMDk2ZTVjNDEzODRmOHAyMjk3NzM@pure-gecko-29773.upstash.io:6379", {
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
});
//# sourceMappingURL=redis.js.map