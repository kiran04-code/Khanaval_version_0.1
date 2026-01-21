import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
    {
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
            required: true,
        },
        identity: {
            name: { type: String, required: true },
            startTime: String,
            endTime: String,
            dietaryType: {
                type: String,
                enum: ["Pure Veg", "Pure Non-Veg", "Hybrid"],
            },
            operatingMode: {
                type: String,
                enum: ["Home-made", "Commercial", "tifin-only"],
            },
        },

        legal: {
            fssaiNumber: {
                type: String,
                required: true,
                minlength: 14,
                maxlength: 14,
            },
        },

        media: {
            cover: {
                type: String,
                required: true,
            },
            kitchen: {
                type: String,
                required: true,
            },
            dining: {
                type: String,
                required: true,
            },
        },

        location: {
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
        },
        messVerified: {
            type: Boolean,
            default: false
        },
        Menu: [
            {
                types: {
                    type: String,
                    enum: ["breakfast", "dinner"],
                },

                imageUrl: {
                    type: String,
                },

                menuDate: {
                    type: Date,
                },

                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        UserFeedBack: [
            {
                username: {
                    type: String
                },
                Text: {
                    type: String
                },
                ratingInStar: {
                    type: Number
                },
                 createdAt: {
                    type: Date,
                    default: Date.now,
                }

            }
        ],
        MessQrcode: {
            type: String,
        }
    },
    { timestamps: true }
);

const Mess = mongoose.model("MessSchema", providerSchema);

export default Mess
