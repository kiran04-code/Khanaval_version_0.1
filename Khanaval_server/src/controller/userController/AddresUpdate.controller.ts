import { type Request, type Response } from "express";
import { UserAdress } from "../../model/UserAddress.js";
import { user } from "../../model/mongo.js";
import { senderror, sendReponse } from "../../utils/Response.js";

export const UpdateUserAdress = async (req: Request, res: Response) => {
    try {
        const userId = req.CloudeUser?.id;
        if (!userId) {
            return senderror(res, 401, "User not authenticated");
        }

        const {
            address,
            houseNo,
            society,
            landmark,
            suburb,
            city,
            state,
            postcode,
            lat,
            lng,
        } = req.body;

        if (!address || !city || !state || !postcode) {
            return senderror(res, 400, "Address, city, state, and postcode are required");
        }

        if (typeof lat !== "number" || typeof lng !== "number") {
            return senderror(res, 400, "Valid latitude and longitude are required");
        }

        const existingUser = await user.findById(userId);
        if (!existingUser) {
            return senderror(res, 404, "User not found");
        }

        const createdAddress = await UserAdress.create({
            address,
            houseNo,
            society,
            landmark,
            suburb,
            city,
            state,
            postcode,
            lat,
            lng,
        });

        await user.findByIdAndUpdate(userId, {
            $push: {
                Address: createdAddress._id,
            },
        });

        return sendReponse(res, 201, "Addres Updated Successfully", createdAddress);
    } catch (error) {
        console.log(error);
        return senderror(res, 500, "Internal Server Error");
    }
}
