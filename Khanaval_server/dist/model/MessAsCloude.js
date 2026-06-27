import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
const MessAsCloudeKitcheSchema = new Schema({
    CloudKitchenName: {
        type: String,
        required: true,
    },
    CloudKitchenType: String,
    CloudKitchenFoodCategory: String,
    CloudKitchenLanguage: String,
    CloudKitchenContactNumber: String,
    CloudKitchenWhatsappNumber: String,
    CloudKitchenAdress: {
        address: {
            type: String,
            required: true,
        },
        houseNo: String,
        society: String,
        landmark: String,
        suburb: String,
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postcode: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    CloudKitchenimage: {
        type: String,
        required: true,
    },
    CloudKitchenOpenTime: {
        type: String,
        required: true,
    },
    CloudKitchenCloseTime: {
        type: String,
        required: true,
    },
    CloudKitchenDetails: {
        type: String,
    },
    CloudKitchenIsOpen: {
        type: Boolean,
        required: true,
        default: true,
    },
    KitchenOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CloudKitchenOwner",
        required: true,
    },
    MenuId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "KitchenMenu"
        }
    ]
});
export const CloudKitchen = model("MessAsCloudeKitche", MessAsCloudeKitcheSchema);
//# sourceMappingURL=MessAsCloude.js.map