import mongoose from "mongoose";
export declare const SubscribeRequest: mongoose.Model<{
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        messId: mongoose.Types.ObjectId;
        userId: string;
        userName: string;
        phoneNumber: string;
        respondedAt?: NativeDate | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        messId: mongoose.Types.ObjectId;
        userId: string;
        userName: string;
        phoneNumber: string;
        respondedAt?: NativeDate | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    messId: mongoose.Types.ObjectId;
    userId: string;
    userName: string;
    phoneNumber: string;
    respondedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=SubscripeRequest.d.ts.map