import { Worker } from "bullmq"
import { redisclient } from "../../config/redis.js"
import { user } from "../../model/mongo.js"
import { Orders } from "../../model/Order.js";
import { KitchenMenu } from "../../model/KicthenMenu.js";
import { CloudKitchen } from "../../model/MessAsCloude.js";
import { sendEmail } from "../Channnel/Email.js";


export const emailWorker = new Worker(
    "FirstEmailonFirstOrder",
    async (job) => {
        try {
            console.log(job.data);

            const { userId, orderId } = job.data;
            const userData = await user.findById(userId);
            const OrderData = await Orders.findById(orderId).populate("KitchenId")
            const UseEmail = userData?.emailId!
            const imageUrl = userData?.imageUrl!
            const UserName = `${userData?.first_name} ${userData?.last_name} `
            await sendEmail(UseEmail,imageUrl,UserName,OrderData)
        } catch (err) {
            console.error(err);
            throw err; // Important so BullMQ knows the job failed
        }
    },
    {
        connection: redisclient,
    }
);


