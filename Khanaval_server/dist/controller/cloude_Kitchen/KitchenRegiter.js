import {} from "express";
import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";
import { CloudKitchen } from "../../model/MessAsCloude.js";
import { senderror, sendReponse } from "../../utils/Response.js";
export const registerCloudKitchen = async (req, res) => {
    try {
        if (!req.CloudeUser?.id) {
            return senderror(res, 401, "User UnAuthorised");
        }
        const { kitchenName, kitchenType, foodCategory, serviceLanguage, phoneNumber, whatsappNumber, operatingHours, aboutKitchen, imageUrl, addressLine, landmark, city, state, pincode, latitude, longitude, } = req.body;
        if (!kitchenName || !imageUrl || !addressLine || !city || !state || !pincode || !latitude || !longitude) {
            return senderror(res, 400, "Required cloud kitchen details are missing");
        }
        const [openTime = "", closeTime = ""] = String(operatingHours || "")
            .split("-")
            .map((value) => value.trim());
        const payload = {
            CloudKitchenName: kitchenName,
            CloudKitchenType: kitchenType,
            CloudKitchenFoodCategory: foodCategory,
            CloudKitchenLanguage: serviceLanguage,
            CloudKitchenContactNumber: phoneNumber,
            CloudKitchenWhatsappNumber: whatsappNumber,
            CloudKitchenimage: imageUrl,
            CloudKitchenAdress: {
                address: addressLine,
                houseNo: "",
                society: "",
                landmark: landmark || "",
                suburb: "",
                city,
                state,
                postcode: pincode,
                lat: Number(latitude),
                lng: Number(longitude),
            },
            CloudKitchenOpenTime: openTime || String(operatingHours || ""),
            CloudKitchenCloseTime: closeTime || String(operatingHours || ""),
            CloudKitchenDetails: aboutKitchen,
            CloudKitchenIsOpen: true,
            KitchenOwnerId: req.CloudeUser.id,
        };
        const cloudKitchen = await CloudKitchen.findOneAndUpdate({ KitchenOwnerId: req.CloudeUser.id }, payload, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
        await CloudKitchenOwner.findByIdAndUpdate(req.CloudeUser.id, {
            isMessRegister: true,
            CloudKitchenID: cloudKitchen._id,
        });
        return sendReponse(res, 201, "Cloud kitchen registered successfully", cloudKitchen);
    }
    catch (error) {
        return senderror(res, 500, "Internal Server Error in cloud kitchen register route", error);
    }
};
//# sourceMappingURL=KitchenRegiter.js.map