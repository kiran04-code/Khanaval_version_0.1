import { model, Schema } from "mongoose";
const UserAddressChema = new Schema({
    address: {
        type: String,
        required: true,
    },
    houseNo: String,
    society: String,
    landmark: String,
    suburb: String,
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
});
export const UserAdress = model("UserAddres", UserAddressChema);
//# sourceMappingURL=UserAddress.js.map