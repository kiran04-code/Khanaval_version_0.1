import mongoose from "mongoose"
import type { IProvider } from "./types.js"

const ProviderScehma = new mongoose.Schema<IProvider>({
  OwnerName: {
        type: String,
        required: true
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
    MessRegister:{
        type: Boolean,
        required: true,
        default:false
    }
})

export const Provider = mongoose.model<IProvider>("Provider", ProviderScehma)