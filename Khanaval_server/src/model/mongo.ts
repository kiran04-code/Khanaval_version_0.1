import mongoose from "mongoose";
import type { Iuser } from "./types.js";

const UserShema = new mongoose.Schema<Iuser>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    emailId: {
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
        default: "customer"
    },
    imageUrl: {
        type: String,
        required: true
    }
})

export const user = mongoose.model<Iuser>("Users", UserShema)