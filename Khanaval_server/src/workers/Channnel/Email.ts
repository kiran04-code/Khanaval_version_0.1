import { createTransport } from "nodemailer"
import dns from "dns";

import { firstOrderEmailTemplate } from "./templates/firstOrderEmail.js";
import "dotenv/config"
const lookup = (hostname: string, options: any, callback: any) => {
    dns.lookup(hostname, { family: 4 }, callback);
};
export const sendEmail = async (UseEmail: string, imageUrl: string, UserName: string, order: any) => {
    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASS!
            },
            tls: {
                servername: "smtp.gmail.com",
            },
            lookup,
        } as any)
        await transport.verify();
        console.log("✅ SMTP Connected");
        const orderPlaceTime = new Date(order.orderPlaceTime);
        const info = await transport.sendMail({
            from: `"Khanaaval" <support@khanaaval.com>`,
            to: UseEmail,
            subject: "🎉 Your First Meal with Khanaaval!",
            html: firstOrderEmailTemplate(
                UserName,
                imageUrl,
                order.KitchenId.CloudKitchenimage,
                order.KitchenId.CloudKitchenName,
                order.AllIteam,
                order.totalPrice,
                order.paymentMode,
                order.OrderStatus,
                order.AddressToDelivedProduct,
                order._id,
                orderPlaceTime
            )
        });
        return info;
    } catch (error) {
        console.log(error)
    }
}