import { model, Schema } from "mongoose";
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
    }
});
export const CloudKitchenOwner = model("CloudKitchenOwner", CloudeKitchemProviderSchema);
//# sourceMappingURL=Cloude_Kitchen_Provider.js.map