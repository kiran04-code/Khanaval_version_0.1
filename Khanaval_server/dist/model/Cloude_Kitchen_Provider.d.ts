import { Schema } from "mongoose";
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
}
export declare const CloudKitchenOwner: import("mongoose").Model<ICloudeKitchenProviderSchema, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<ICloudeKitchenProviderSchema, import("mongoose").Model<ICloudeKitchenProviderSchema, any, any, any, (import("mongoose").Document<unknown, any, ICloudeKitchenProviderSchema, any, import("mongoose").DefaultSchemaOptions> & ICloudeKitchenProviderSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, ICloudeKitchenProviderSchema, any, import("mongoose").DefaultSchemaOptions> & ICloudeKitchenProviderSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, ICloudeKitchenProviderSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string | undefined, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    providerName?: import("mongoose").SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    role?: import("mongoose").SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isMessRegister?: import("mongoose").SchemaDefinitionProperty<Boolean, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    PushNotifcationToken?: import("mongoose").SchemaDefinitionProperty<string, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isPaymentDone?: import("mongoose").SchemaDefinitionProperty<Boolean, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionStatus?: import("mongoose").SchemaDefinitionProperty<String, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionStartDate?: import("mongoose").SchemaDefinitionProperty<Date, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subscriptionEndDate?: import("mongoose").SchemaDefinitionProperty<Date, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastPaymentDate?: import("mongoose").SchemaDefinitionProperty<Date, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paymentAmount?: import("mongoose").SchemaDefinitionProperty<number, ICloudeKitchenProviderSchema, import("mongoose").Document<unknown, {}, ICloudeKitchenProviderSchema, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICloudeKitchenProviderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ICloudeKitchenProviderSchema>, ICloudeKitchenProviderSchema>;
//# sourceMappingURL=Cloude_Kitchen_Provider.d.ts.map