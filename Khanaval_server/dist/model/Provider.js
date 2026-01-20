import mongoose from "mongoose";
const ProviderScehma = new mongoose.Schema({
    OwnerName: {
        type: String,
        required: true
    },
    FCMtoken: {
        type: String,
    },
    number: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ["customer", "provider"],
        required: true,
        default: "provider"
    },
    MessRegister: {
        type: Boolean,
        required: true,
        default: false
    }
});
export const Provider = mongoose.model("Provider", ProviderScehma);
//# sourceMappingURL=Provider.js.map