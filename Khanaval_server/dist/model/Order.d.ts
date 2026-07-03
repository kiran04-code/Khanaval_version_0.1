import mongoose from "mongoose";
interface ProductsDetails {
    productId: mongoose.Types.ObjectId;
    count: number;
}
interface Iorders {
    userId: mongoose.Types.ObjectId;
    KitchenId: mongoose.Types.ObjectId;
    totalPrice: number;
    paymentMode: string;
    OrderStatus: string;
    orderPlaceTime: Date;
    AllIteam: string;
    productList: ProductsDetails[];
    AddressToDelivedProduct: string;
}
export declare const Orders: mongoose.Model<Iorders, {}, {}, {}, mongoose.Document<unknown, {}, Iorders, {}, mongoose.DefaultSchemaOptions> & Iorders & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Iorders>;
export {};
//# sourceMappingURL=Order.d.ts.map