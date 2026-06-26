import mongoose, { model } from "mongoose"
import { Schema } from "mongoose"
type Address = {
    address: string,
    houseNo: string,
    society: string,
    landmark: string,
    suburb: string,
    city: string,
    state: string
    postcode: string
    lat: number,
    lng: number,
}
interface MessAsCloudeKitche {
    CloudKitchenName: string,
    CloudKitchenType?: string,
    CloudKitchenFoodCategory?: string,
    CloudKitchenLanguage?: string,
    CloudKitchenContactNumber?: string,
    CloudKitchenWhatsappNumber?: string,
    CloudKitchenimage: string,
    CloudKitchenAdress: Address,
    CloudKitchenOpenTime: string,
    CloudKitchenCloseTime: string,
    CloudKitchenDetails?: string,
    CloudKitchenIsOpen: Boolean,
    KitchenOwnerId: mongoose.Types.ObjectId,
}
const MessAsCloudeKitcheSchema = new Schema<MessAsCloudeKitche>({
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
    }
})


export const  CloudKitchen = model("MessAsCloudeKitche",MessAsCloudeKitcheSchema)
