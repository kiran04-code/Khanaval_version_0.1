import {} from "express";
import { sendReponse } from "../../utils/Response.js";
import { razorpayInstance } from "../../paymentGateway/razorpay.js";
import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";
import { payment } from "../../model/PaymenyData.js";
import { ApiError } from "../../utils/Apierror.js";
import { PaymentService } from "../../services/Cloudekitchen/Payment.js";
export const CreateOrderforClient = async (req, res) => {
    try {
        const { amounts } = req.body;
        const option = {
            amount: amounts * 100,
            currency: 'INR'
        };
        const order = await razorpayInstance.orders.create(option);
        return sendReponse(res, 200, "Order Create SucessFull", order);
    }
    catch (error) {
        return sendReponse(res, 503, "payment server Down");
    }
};
export const UpdateUserSatus = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, paymentAmmount } = req.body;
        const id = req.params.id;
        if (!id) {
            return sendReponse(res, 400, "Missing user id");
        }
        await PaymentService.UpdateUserPaymentStatus(paymentAmmount, id, razorpay_payment_id);
        return sendReponse(res, 200, "User Update SucessFull");
    }
    catch (error) {
        if (error instanceof ApiError) {
            sendReponse(res, error.statusCode, error.message);
        }
        return sendReponse(res, 503, "payment server Down");
    }
};
//# sourceMappingURL=paymentGateway.js.map