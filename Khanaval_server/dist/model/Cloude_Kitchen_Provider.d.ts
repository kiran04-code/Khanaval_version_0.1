import mongoose from "mongoose";
export interface ICloudeKitchenProviderSchema {
    id?: string;
    providerName: string;
    phoneNumber: string;
    role: string;
    isMessRegister: Boolean;
    PushNotifcationToken: string;
    isPaymentDone: Boolean;
    subscriptionStatus: String;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    lastPaymentDate: Date;
    paymentAmount: number;
    CloudKitchenID: mongoose.Types.ObjectId;
}
export declare const CloudKitchenOwner: mongoose.Model<ICloudeKitchenProviderSchema, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<ICloudeKitchenProviderSchema, mongoose.Model<ICloudeKitchenProviderSchema, any, any, any, (mongoose.Document<unknown, any, ICloudeKitchenProviderSchema, any, mongoose.DefaultSchemaOptions> & ICloudeKitchenProviderSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, ICloudeKitchenProviderSchema, any, mongoose.DefaultSchemaOptions> & ICloudeKitchenProviderSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}), any, ICloudeKitchenProviderSchema>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    id?: mongoose.SchemaDefinitionProperty<string | undefined, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    providerName?: mongoose.SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    role?: mongoose.SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isMessRegister?: mongoose.SchemaDefinitionProperty<Boolean, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    PushNotifcationToken?: mongoose.SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isPaymentDone?: mongoose.SchemaDefinitionProperty<Boolean, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionStatus?: mongoose.SchemaDefinitionProperty<String, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionStartDate?: mongoose.SchemaDefinitionProperty<Date, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionEndDate?: mongoose.SchemaDefinitionProperty<Date, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastPaymentDate?: mongoose.SchemaDefinitionProperty<Date, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paymentAmount?: mongoose.SchemaDefinitionProperty<number, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenID?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ICloudeKitchenProviderSchema, mongoose.Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ICloudeKitchenProviderSchema>, ICloudeKitchenProviderSchema>;
//# sourceMappingURL=Cloude_Kitchen_Provider.d.ts.map