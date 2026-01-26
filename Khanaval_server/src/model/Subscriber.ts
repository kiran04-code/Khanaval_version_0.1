import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessSchema",
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
    },
    RemainingDay: {
      type: Number,
      required: true,
    },
      startAt: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    allScans: [
      {
        scannedAt: {
          type: Date,
        },
      },
    ],
    lastScannedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);
