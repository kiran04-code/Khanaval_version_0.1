import { response } from "express";
import cloudinary from "../config/cloudnary.js";
import Mess from "../model/Mess.js";
import { redisclient } from "../config/redis.js";
export const BufferimagetoURlimage = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }
        const files = req.files;
        if (!files || !files.cover || !files.kitchen) {
            return res.status(400).json({ success: false, message: "Missing files" });
        }
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "MessImages" }, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result.secure_url);
                });
                stream.end(buffer);
            });
        };
        const coverFile = files.cover?.[0];
        const kitchenFile = files.kitchen?.[0];
        const diningFile = files.dining?.[0];
        const coverUrl = coverFile ? await streamUpload(coverFile.buffer) : null;
        const kitchenUrl = kitchenFile ? await streamUpload(kitchenFile.buffer) : null;
        const diningUrl = diningFile ? await streamUpload(diningFile.buffer) : null;
        return res.json({
            success: true,
            urls: {
                cover: coverUrl,
                kitchen: kitchenUrl,
                dining: diningUrl
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            urls: null,
        });
    }
};
export const getAllDATA = async (req, res) => {
    const cachekey = "AllMESS";
    const cachedata = await redisclient.get(cachekey);
    if (cachedata)
        return res.json({
            allmess: JSON.parse(cachedata)
        });
    const mess = await Mess.find({ messVerified: true }).populate("providerId");
    await redisclient.set(cachekey, JSON.stringify(mess));
    return res.json({
        allmess: mess
    });
};
export const Addmenus = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: "image not Uploaded yet"
            });
        }
        const bufferToDataURI = (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const fileDataURI = bufferToDataURI(req.file);
        const result = await cloudinary.uploader.upload(fileDataURI, {
            folder: "menus",
        });
        await Mess.findByIdAndUpdate(req.body?.id, {
            $push: {
                Menu: {
                    types: req.body.type,
                    imageUrl: result?.secure_url,
                    menuDate: result?.date
                }
            }
        });
        const cachekey = "AllMESS";
        await redisclient.del(cachekey);
        return res.json({
            success: true,
            message: "Menu Updated Sucessfully"
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Server Error"
        });
    }
};
//# sourceMappingURL=Provoder.js.map