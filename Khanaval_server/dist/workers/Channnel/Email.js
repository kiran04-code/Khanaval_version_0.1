import { createTransport } from "nodemailer";
import dns from "dns";
import { firstOrderEmailTemplate } from "./templates/firstOrderEmail.js";
import "dotenv/config";
const lookup = (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
};
export const sendEmail = async (UseEmail, imageUrl, UserName, order) => {
    try {
        const transport = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        await transport.verify();
        console.log("✅ SMTP Connected");
        const orderPlaceTime = new Date(order.orderPlaceTime);
        const info = await transport.sendMail({
            from: `"Khanaaval"<khanaaval.com@gmail.com>`,
            to: UseEmail,
            subject: "🎉 Your First Meal with Khanaaval!",
            html: firstOrderEmailTemplate(UserName, imageUrl, order.KitchenId.CloudKitchenimage, order.KitchenId.CloudKitchenName, order.AllIteam, order.totalPrice, order.paymentMode, order.OrderStatus, order.AddressToDelivedProduct, order._id, orderPlaceTime)
        });
        return info;
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=Email.js.map