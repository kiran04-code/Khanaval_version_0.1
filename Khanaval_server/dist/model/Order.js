import mongoose, { model, Schema } from "mongoose";
const ProductDetailsSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KitchenMenu",
        required: true,
    },
    count: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false });
const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    KitchenId: {
        type: Schema.Types.ObjectId,
        ref: "MessAsCloudeKitche",
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        enum: ["Cash", "Online", "UPI", "Card"],
        required: true,
    },
    OrderStatus: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Preparing",
            "Ready",
            "OutForDelivery",
            "Delivered",
            "Cancelled",
        ],
        default: "Pending",
    },
    orderPlaceTime: {
        type: Date,
        default: Date.now,
    },
    AllIteam: {
        type: String,
    },
    productList: {
        type: [ProductDetailsSchema],
        required: true,
    },
    AddressToDelivedProduct: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});
export const Orders = model("Orders", OrderSchema);
//# sourceMappingURL=Order.js.map