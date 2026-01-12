import mongoose from "mongoose";
import type { Iuser } from "./types.js";
export declare const user: mongoose.Model<Iuser, {}, {}, {}, mongoose.Document<unknown, {}, Iuser, {}, mongoose.DefaultSchemaOptions> & Iuser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Iuser>;
//# sourceMappingURL=mongo.d.ts.map