import { response } from "express";
import cloudinary from "../config/cloudnary.js";
import Mess from "../model/Mess.js";
import { redisclient } from "../config/redis.js";
import { Provider } from "../model/Provider.js";
import { user } from "../model/mongo.js";
import { sendNotification } from "../firebase/SendNotification.js";
import { Feedback } from "../model/FeedBack.js";
export const BufferimagetoURlimage = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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
        console.error("ImageUrl route error:", error);
        return res.status(500).json({
            success: false,
            message: "Image upload failed",
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
    const mess = await Mess.find({ messVerified: true })
        .populate("providerId");
    await redisclient.set(cachekey, JSON.stringify(mess));
    return res.json({
        allmess: mess
    });
};
export const GetValidMess = async (req, res) => {
    const cachekey = "AllMESS";
    const cachedata = await redisclient.get(cachekey);
    if (cachedata)
        return res.json({
            allmess: JSON.parse(cachedata)
        });
    const mess = await Mess.find().populate("providerId");
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
        console.log(error);
        return res.json({
            success: false,
            message: "Server Error"
        });
    }
};
export const DeletetheMenu = async (req, res) => {
    try {
        const { id, types } = req.body;
        const mess = await Mess.findById(id);
        if (!mess)
            return res.status(404).json({ error: "Mess not found" });
        const menuItem = mess.Menu.id(types);
        if (!menuItem)
            return res.status(404).json({ error: "Menu not found" });
        if (menuItem.imageUrl) {
            await cloudinary.uploader.destroy(menuItem.imageUrl);
        }
        await menuItem.deleteOne();
        await mess.save();
        const cachekey = "AllMESS";
        await redisclient.del(cachekey);
        return res.status(200).json({
            success: true,
            message: "server not resonsing"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
export const sendMessageToAllUser = async (req, res) => {
    try {
        const { message } = req.body;
        const providers = await user.find({
            FCMtoken: { $exists: true, $ne: null },
        });
        if (!providers.length) {
            return res.status(404).json({
                success: false,
                message: "No User with FCM tokens found",
            });
        }
        await Promise.allSettled(providers.map(async (provider) => {
            try {
                await sendNotification(provider.FCMtoken, "Menu Update 🍽️ 🍽️", `${message}`);
            }
            catch (err) {
                console.error(`FCM Error for ${provider._id}:`, err.message);
            }
        }));
        return res.status(200).json({
            success: true,
            message: "Message sent to all Users successfully!",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Notification failed",
        });
        console.error("Error sending messages to all providers:", error);
    }
};
export const NotificationsPUSH = async (req, res) => {
    try {
        const { message } = req.body;
        const providers = await Provider.find({
            FCMtoken: { $exists: true, $nin: [null, ""] },
        });
        if (!providers.length) {
            return res.status(404).json({
                success: false,
                message: "No providers with FCM tokens",
            });
        }
        await Promise.allSettled(providers.map((provider) => sendNotification(provider.FCMtoken, "Khanaaval Alert 🍽️", `${message}`)));
        return res.status(200).json({
            success: true,
            message: "Notification sent to all providers",
        });
    }
    catch (error) {
        console.error("PUSH ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const getAllUser = async (req, res) => {
    try {
        const data = await user.find();
        return res.json({
            userData: data
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: true,
            message: "server Error"
        });
    }
};
export const getAllProvider = async (req, res) => {
    try {
        const allProvider = await Provider.find();
        return res.json({
            ProviderData: allProvider
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Server Error To Fetch Provider"
        });
    }
};
export const verifiyMess = async (req, res) => {
    try {
        const { ids, verifyed } = req.body;
        console.log(req.body);
        await Mess.findByIdAndUpdate(ids, { messVerified: verifyed });
        const cachekey = "AllMESS";
        await redisclient.del(cachekey);
        return res.json({
            success: true,
            message: "Mess Updated Sucessfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: true,
            message: "server Error"
        });
    }
};
export const sendFeedback = async (req, res) => {
    try {
        const { messId, text, name, Stars } = req.body;
        await Mess.findByIdAndUpdate(messId, {
            $push: {
                UserFeedBack: {
                    username: name,
                    Text: text,
                    ratingInStar: Stars,
                }
            }
        });
        const cachekey = "AllMESS";
        await redisclient.del(cachekey);
        return res.json({
            success: true,
            message: "FeedBackSubmited"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(503).json({
            success: false,
            message: "server Error"
        });
    }
};
export const finderUserByNumber = async (req, res) => {
    try {
        console.log(req.body);
        const { number } = req.body;
        const data = await user.findOne({ number: number });
        if (data?.Subscriber) {
            return res.json({
                success: false,
                message: "User is Alredy in Anather Mess",
                userData: null
            });
        }
        return res.json({
            success: true,
            message: "User found",
            userData: data
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Server"
        });
    }
};
export const submitFeedback = async (req, res) => {
    try {
        // Extract formData from the request body
        const { formData } = req.body;
        if (!formData) {
            return res.status(400).json({
                success: false,
                message: "No data provided"
            });
        }
        const newFeedback = await Feedback.create({
            rating: formData.rating,
            fullName: formData.fullName,
            email: formData.email,
            topic: formData.topic,
            message: formData.message
        });
        console.log(newFeedback);
        return res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
        });
    }
    catch (error) {
        console.error("Feedback Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
export const getAllFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: feedbackList.length,
            data: feedbackList
        });
    }
    catch (error) {
        console.error("Fetch Feedback Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
//# sourceMappingURL=Provoder.js.map