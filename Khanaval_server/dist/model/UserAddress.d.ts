import { Schema } from "mongoose";
interface UserAddress {
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
}
export declare const UserAdress: import("mongoose").Model<UserAddress, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, UserAddress, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<UserAddress, import("mongoose").Model<UserAddress, any, any, any, (import("mongoose").Document<unknown, any, UserAddress, any, import("mongoose").DefaultSchemaOptions> & UserAddress & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, UserAddress, any, import("mongoose").DefaultSchemaOptions> & UserAddress & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, UserAddress>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    address?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    houseNo?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    society?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    landmark?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    suburb?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    city?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    state?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    postcode?: import("mongoose").SchemaDefinitionProperty<string, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lat?: import("mongoose").SchemaDefinitionProperty<number, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lng?: import("mongoose").SchemaDefinitionProperty<number, UserAddress, import("mongoose").Document<unknown, {}, UserAddress, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserAddress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, UserAddress>, UserAddress>;
export {};
//# sourceMappingURL=UserAddress.d.ts.map