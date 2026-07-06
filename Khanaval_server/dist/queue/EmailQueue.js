import { Queue } from "bullmq";
import { redisclient } from "../config/redis.js";
export const KhanaavalEmailQueue = new Queue("FirstEmailonFirstOrder", { connection: redisclient });
//# sourceMappingURL=EmailQueue.js.map