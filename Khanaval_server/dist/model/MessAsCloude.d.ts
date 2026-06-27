import mongoose from "mongoose";
type Address = {
    address: string;
    houseNo: string;
    society: string;
    landmark: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    lat: number;
    lng: number;
};
interface MessAsCloudeKitche {
    CloudKitchenName: string;
    CloudKitchenType?: string;
    CloudKitchenFoodCategory?: string;
    CloudKitchenLanguage?: string;
    CloudKitchenContactNumber?: string;
    CloudKitchenWhatsappNumber?: string;
    CloudKitchenimage: string;
    CloudKitchenAdress: Address;
    CloudKitchenOpenTime: string;
    CloudKitchenCloseTime: string;
    CloudKitchenDetails?: string;
    CloudKitchenIsOpen: Boolean;
    KitchenOwnerId: mongoose.Types.ObjectId;
    MenuId: mongoose.Types.ObjectId[];
}
export declare const CloudKitchen: mongoose.Model<MessAsCloudeKitche, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<MessAsCloudeKitche, mongoose.Model<MessAsCloudeKitche, any, any, any, (mongoose.Document<unknown, any, MessAsCloudeKitche, any, mongoose.DefaultSchemaOptions> & MessAsCloudeKitche & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, MessAsCloudeKitche, any, mongoose.DefaultSchemaOptions> & MessAsCloudeKitche & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}), any, MessAsCloudeKitche>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    CloudKitchenName?: mongoose.SchemaDefinitionProperty<string, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenType?: mongoose.SchemaDefinitionProperty<string | undefined, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenFoodCategory?: mongoose.SchemaDefinitionProperty<string | undefined, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenLanguage?: mongoose.SchemaDefinitionProperty<string | undefined, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenContactNumber?: mongoose.SchemaDefinitionProperty<string | undefined, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenWhatsappNumber?: mongoose.SchemaDefinitionProperty<string | undefined, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenimage?: mongoose.SchemaDefinitionProperty<string, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenAdress?: mongoose.SchemaDefinitionProperty<Address, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenOpenTime?: mongoose.SchemaDefinitionProperty<string, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenCloseTime?: mongoose.SchemaDefinitionProperty<string, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenDetails?: mongoose.SchemaDefinitionProperty<string | undefined, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    CloudKitchenIsOpen?: mongoose.SchemaDefinitionProperty<Boolean, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    KitchenOwnerId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    MenuId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], MessAsCloudeKitche, mongoose.Document<unknown, {}, MessAsCloudeKitche, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MessAsCloudeKitche & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, MessAsCloudeKitche>, MessAsCloudeKitche>;
export {};
//# sourceMappingURL=MessAsCloude.d.ts.map