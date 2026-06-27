import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
const KitchenMenuSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true
    },
    productimage: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    KitchenId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productCreateAt: {
        type: Date,
        default: null
    },
    Visible_to_customers: {
        type: Boolean,
        default: true
    }
});
export const KitchenMenu = model("KitchenMenu", KitchenMenuSchema);
//# sourceMappingURL=KicthenMenu.js.map