import mongoose, { model, Schema } from "mongoose"
interface ProductsDetails {
    productId: mongoose.Types.ObjectId,
    count: number
}

interface Iorders {
    userId: mongoose.Types.ObjectId,
    KitchenId: mongoose.Types.ObjectId
    totalPrice: number,
    paymentMode: string,
    OrderStatus: string,
    orderPlaceTime: Date,
    AllIteam: string,
    productList: ProductsDetails[],
    AddressToDelivedProduct:string
}




const ProductDetailsSchema = new Schema<ProductsDetails>(
    {
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
    },
    { _id: false }
);

const OrderSchema = new Schema<Iorders>(
    {
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
        AddressToDelivedProduct:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

export const Orders = model<Iorders>("Orders", OrderSchema);
