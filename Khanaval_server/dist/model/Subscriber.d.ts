import mongoose from "mongoose";
export declare const Subscription: mongoose.Model<{
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
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
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
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
        userId: mongoose.Types.ObjectId;
        totalDays: number;
        RemainingDay: number;
        startAt: NativeDate;
        price: number;
        isActive: boolean;
        allScans: mongoose.Types.DocumentArray<{
            scannedAt?: NativeDate | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            scannedAt?: NativeDate | null;
        }> & {
            scannedAt?: NativeDate | null;
        }>;
        lastScannedAt?: NativeDate | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        messId: mongoose.Types.ObjectId;
        userId: mongoose.Types.ObjectId;
        totalDays: number;
        RemainingDay: number;
        startAt: NativeDate;
        price: number;
        isActive: boolean;
        allScans: mongoose.Types.DocumentArray<{
            scannedAt?: NativeDate | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            scannedAt?: NativeDate | null;
        }> & {
            scannedAt?: NativeDate | null;
        }>;
        lastScannedAt?: NativeDate | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    messId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalDays: number;
    RemainingDay: number;
    startAt: NativeDate;
    price: number;
    isActive: boolean;
    allScans: mongoose.Types.DocumentArray<{
        scannedAt?: NativeDate | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        scannedAt?: NativeDate | null;
    }> & {
        scannedAt?: NativeDate | null;
    }>;
    lastScannedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Subscriber.d.ts.map