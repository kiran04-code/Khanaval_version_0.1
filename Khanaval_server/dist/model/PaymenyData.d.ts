import mongoose from "mongoose";
export interface IPaymentData {
    userId: mongoose.Types.ObjectId;
    amount: number;
    paymentDate: Date;
    paymentStatus: "pending" | "success" | "failed";
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    razorpay_payment_id: string;
}
export declare const payment: mongoose.Model<IPaymentData, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IPaymentData, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IPaymentData, mongoose.Model<IPaymentData, any, any, any, (mongoose.Document<unknown, any, IPaymentData, any, mongoose.DefaultSchemaOptions> & IPaymentData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, IPaymentData, any, mongoose.DefaultSchemaOptions> & IPaymentData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}), any, IPaymentData>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    amount?: mongoose.SchemaDefinitionProperty<number, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paymentDate?: mongoose.SchemaDefinitionProperty<Date, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paymentStatus?: mongoose.SchemaDefinitionProperty<"pending" | "success" | "failed", IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionStartDate?: mongoose.SchemaDefinitionProperty<Date, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionEndDate?: mongoose.SchemaDefinitionProperty<Date, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    razorpay_payment_id?: mongoose.SchemaDefinitionProperty<string, IPaymentData, mongoose.Document<unknown, {}, IPaymentData, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IPaymentData & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IPaymentData>, IPaymentData>;
//# sourceMappingURL=PaymenyData.d.ts.map