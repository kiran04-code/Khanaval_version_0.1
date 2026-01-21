import mongoose from "mongoose";
const UserShema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ["customer", "provider"],
        required: true,
        default: "customer"
    },
    Subscriber: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        required: true
    }
});
export const user = mongoose.model("Users", UserShema);
//# sourceMappingURL=mongo.js.map