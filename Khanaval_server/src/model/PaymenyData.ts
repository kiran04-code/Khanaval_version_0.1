import mongoose, { model, Schema } from "mongoose";

export interface IPaymentData {
    userId: mongoose.Types.ObjectId;
    amount: number;
    paymentDate: Date;
    paymentStatus: "pending" | "success" | "failed";
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    razorpay_payment_id:string
}


const paymentSchema   = new Schema<IPaymentData>({
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
    razorpay_payment_id:{
        type:String,
        require:true,
    }
},{
    timestamps:true,
})

export const payment = model("PaymentDetails", paymentSchema)