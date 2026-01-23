import mongoose, { Document } from 'mongoose';
export interface IFeedback extends Document {
    rating: number;
    fullName: string;
    email: string;
    topic: string;
    message: string;
    createdAt: Date;
}
export declare const Feedback: mongoose.Model<IFeedback, {}, {}, {}, mongoose.Document<unknown, {}, IFeedback, {}, mongoose.DefaultSchemaOptions> & IFeedback & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFeedback>;
//# sourceMappingURL=FeedBack.d.ts.map