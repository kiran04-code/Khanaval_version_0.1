import { redisclient } from "../config/redis.js";
export const DeleteDataFromRedis = async (key) => {
    await redisclient.del(key);
};
//# sourceMappingURL=Redis.js.map