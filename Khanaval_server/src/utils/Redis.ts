import { redisclient } from "../config/redis.js"

export const DeleteDataFromRedis = async(key:string): Promise<void> =>{
await redisclient.del(key)
}