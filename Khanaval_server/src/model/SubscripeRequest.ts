import mongoose from "mongoose";

const subscribeRequestSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessSchema",
      required: true,
    },
    userId: {
      type:String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

export const SubscribeRequest = mongoose.model(
  "SubscribeRequest",
  subscribeRequestSchema
);
