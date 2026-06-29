import {} from "express";
import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";
import { CloudKitchen } from "../../model/MessAsCloude.js";
import { senderror, sendReponse } from "../../utils/Response.js";
import { ApiError } from "../../utils/Apierror.js";
import { KitchenService } from "../../services/Cloudekitchen/KitchenAsMessService.js";
import { redisclient } from "../../config/redis.js";
import { KitchenMenu } from "../../model/KicthenMenu.js";
import { DeleteDataFromRedis } from "../../utils/Redis.js";
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
        await DeleteDataFromRedis(KEYFORMESDATA);
        return sendReponse(res, 201, "Cloud kitchen registered successfully", cloudKitchen);
    }
    catch (error) {
        return senderror(res, 500, "Internal Server Error in cloud kitchen register route", error);
    }
};
export const AddItemToMenu = async (req, res) => {
    try {
        const { productName, productprice, productimage, productCategory } = req.body;
        if (!productName || !productprice || !productimage) {
            return senderror(res, 400, "Bad request body Miss Some data");
        }
        const kitchenId = req.params.kid;
        await KitchenService.AddItemToMenu(productName, productprice, productimage, productCategory, kitchenId);
        await DeleteDataFromRedis(KEYFORMESDATA);
        return sendReponse(res, 201, "Menu Create Suucesfully");
    }
    catch (error) {
        if (error instanceof ApiError) {
            return senderror(res, error.statusCode, error.message);
        }
        return senderror(res, 500, "Internal server Error");
    }
};
const KEYFORMESDATA = "CLOUDEMESS";
export const DeleteMenuByID = async (req, res) => {
    try {
        const menuId = req?.params.menuId;
        await KitchenMenu.findByIdAndDelete(menuId);
        return sendReponse(res, 200, "Menu Delete Suucesfully");
        await DeleteDataFromRedis(KEYFORMESDATA);
    }
    catch (error) {
        if (error instanceof ApiError) {
            return senderror(res, error.statusCode, error.message);
        }
        return senderror(res, 500, "Internal server Error");
    }
};
export const MessOnOffByid = async (req, res) => {
    try {
        const messId = req?.params.messId;
        const kitchen = await CloudKitchen.findByIdAndUpdate(messId);
        if (!kitchen) {
            return senderror(res, 404, "Cloud Kitchen not found");
        }
        kitchen.CloudKitchenIsOpen = !kitchen.CloudKitchenIsOpen;
        kitchen.save();
        await DeleteDataFromRedis(KEYFORMESDATA);
        return sendReponse(res, 200, `Kitchen is now ${kitchen.CloudKitchenIsOpen ? "Open" : "Closed"}`, kitchen);
    }
    catch (error) {
        if (error instanceof ApiError) {
            return senderror(res, error.statusCode, error.message);
        }
        return senderror(res, 500, "Internal server Error");
    }
};
export const GetAllCloudeKitchne = async (req, res) => {
    try {
        const data = await redisclient.get(KEYFORMESDATA);
        // Cache hit
        if (data) {
            return sendReponse(res, 201, "Menu Create Suucesfully", JSON.parse(data));
        }
        // Cache mess
        const getAllCloudeMess = await CloudKitchen.find({})
            .populate("KitchenOwnerId")
            .populate("MenuId");
        await redisclient.setex(KEYFORMESDATA, 60 * 60, JSON.stringify(getAllCloudeMess));
        return sendReponse(res, 201, "Menu Create Suucesfully", getAllCloudeMess);
    }
    catch (error) {
        if (error instanceof ApiError) {
            return senderror(res, error.statusCode, error.message);
        }
        return senderror(res, 500, "Internal server Error");
    }
};
//# sourceMappingURL=KitchenRegiter.js.map