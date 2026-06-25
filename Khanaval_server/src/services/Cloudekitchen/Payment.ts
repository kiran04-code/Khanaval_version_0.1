import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";
import { payment } from "../../model/PaymenyData.js";
import { ApiError } from "../../utils/Apierror.js";

export class PaymentService {
    static async UpdateUserPaymentStatus(amount: number, id: string, payment_Id: string): Promise<boolean> {
        if (Number.isNaN(amount)) {
            throw new ApiError(400, "Missing user id")
        }
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);
        await CloudKitchenOwner.findByIdAndUpdate(id, {
            isPaymentDone: true,
            subscriptionStatus: "active",
            subscriptionStartDate: startDate,
            subscriptionEndDate: endDate,
            lastPaymentDate: startDate,
            paymentAmount: amount
        })
        const data = await payment.create({
            userId: id,
            subscriptionStartDate: startDate,
            subscriptionEndDate: endDate,
            paymentDate: startDate,
            paymentStatus: "success",
            razorpay_payment_id: payment_Id,
            amount: amount
        })
        console.log(data)
        return true;
    }
}