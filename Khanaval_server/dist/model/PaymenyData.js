import mongoose, { model, Schema } from "mongoose";
const paymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CloudKitchenOwner",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: null
    },
    subscriptionStartDate: {
        type: Date,
        default: null
    },
    subscriptionEndDate: {
        type: Date,
        default: null
    },
    razorpay_payment_id: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
});
export const payment = model("PaymentDetails", paymentSchema);
//# sourceMappingURL=PaymenyData.js.map