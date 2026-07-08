import { createTransport } from "nodemailer";
import { firstOrderEmailTemplate } from "./templates/firstOrderEmail.js";
import "dotenv/config";
export const sendEmail = async (UseEmail, imageUrl, UserName, order) => {
    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        await transport.verify();
        console.log("✅ SMTP Connected");
        const orderPlaceTime = new Date(order.orderPlaceTime);
        const info = await transport.sendMail({
            from: `"Khanaaval" <support@khanaaval.com>`,
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