import { model, Schema } from "mongoose"

interface UserAddress {
    address: string,
    houseNo: string,
    society: string,
    landmark: string,
    suburb: string,
    city: string,
    state: string
    postcode: string
    lat: number,
    lng: number,
}

const UserAddressChema = new Schema<UserAddress>({
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
   
})

export const UserAdress = model("UserAddres",UserAddressChema)