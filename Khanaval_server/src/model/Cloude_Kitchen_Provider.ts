import { model, Schema } from "mongoose"

export interface ICloudeKitchenProviderSchema {
    id?: string,
    providerName: string,
    phoneNumber: string,
    role: string,
    isMessRegister: Boolean,
    PushNotifcationToken: string,
    isPaymentDone: Boolean,
    subscriptionStatus:String,
    subscriptionStartDate:Date,
    subscriptionEndDate:Date,
    lastPaymentDate:Date,
    paymentAmount:number

}
const CloudeKitchemProviderSchema = new Schema<ICloudeKitchenProviderSchema>({
    providerName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "cloud_admin",
    },
    isMessRegister: {
        type: Boolean,
        required: true,
        default: false
    },
    PushNotifcationToken: {
        type: String,
        default: null
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    },
    subscriptionStatus: {
        type: String,
        enum: ["inactive", "active", "expired"],
        default: "inactive",
    },
    subscriptionStartDate: {
        type: Date,
        default: null,
    },

    subscriptionEndDate: {
        type: Date,
        default: null,
    },

    lastPaymentDate: {
        type: Date,
        default: null,
    },
    paymentAmount: {
        type: Number,
        default: 0,
    }
})

export const CloudKitchenOwner = model("CloudKitchenOwner", CloudeKitchemProviderSchema);