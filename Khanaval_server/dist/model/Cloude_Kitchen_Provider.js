import mongoose, { model, Schema } from "mongoose";
const CloudeKitchemProviderSchema = new Schema({
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
    },
    CloudKitchenID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessAsCloudeKitche",
        require: true,
    }
});
export const CloudKitchenOwner = model("CloudKitchenOwner", CloudeKitchemProviderSchema);
//# sourceMappingURL=Cloude_Kitchen_Provider.js.map