import mongoose from "mongoose";
import type { Iuser } from "./types.js";

const UserShema = new mongoose.Schema<Iuser>(
  {
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
     FCMtoken:{
         type: String,
    },
    user_type: {
        type: String,
        enum: ["customer", "provider"],
        required: true,
        default: "customer"
    },
    Subscriber:{
          type:Boolean,
          default:false
    },
    imageUrl: {
        type: String,
        required: true
    }
  } as unknown as mongoose.SchemaDefinition<Iuser>
)

export const user = mongoose.model<Iuser>("Users", UserShema)