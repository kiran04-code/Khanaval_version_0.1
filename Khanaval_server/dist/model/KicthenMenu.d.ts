import mongoose from "mongoose";
interface IKitchenMenu {
    productName: string;
    productimage: string;
    productCategory: string;
    productprice: number;
    KitchenId: mongoose.Types.ObjectId;
    productCreateAt: Date;
    Visible_to_customers: Boolean;
}
export declare const KitchenMenu: mongoose.Model<IKitchenMenu, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IKitchenMenu, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IKitchenMenu, mongoose.Model<IKitchenMenu, any, any, any, (mongoose.Document<unknown, any, IKitchenMenu, any, mongoose.DefaultSchemaOptions> & IKitchenMenu & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, IKitchenMenu, any, mongoose.DefaultSchemaOptions> & IKitchenMenu & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}), any, IKitchenMenu>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    productName?: mongoose.SchemaDefinitionProperty<string, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    productimage?: mongoose.SchemaDefinitionProperty<string, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    productCategory?: mongoose.SchemaDefinitionProperty<string, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    productprice?: mongoose.SchemaDefinitionProperty<number, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    KitchenId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    productCreateAt?: mongoose.SchemaDefinitionProperty<Date, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    Visible_to_customers?: mongoose.SchemaDefinitionProperty<Boolean, IKitchenMenu, mongoose.Document<unknown, {}, IKitchenMenu, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IKitchenMenu & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IKitchenMenu>, IKitchenMenu>;
export {};
//# sourceMappingURL=KicthenMenu.d.ts.map