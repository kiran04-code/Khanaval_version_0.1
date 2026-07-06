import { createTransport } from "nodemailer"

import { firstOrderEmailTemplate } from "./templates/firstOrderEmail.js";
import "dotenv/config"
export const sendEmail = async (UseEmail: string, imageUrl: string, UserName: string, order: any) => {
    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASS!
            }
        })
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