import { response, type Request, type Response } from "express"
import cloudinary from "../config/cloudnary.js";
import Mess from "../model/Mess.js";
import { redisclient } from "../config/redis.js";
import { Provider } from "../model/Provider.js";
import { sendNotification } from "../firebase/SendNotification.js";
import { user } from "../model/mongo.js";
interface MulterFiles {
    [fieldname: string]: Express.Multer.File[];
}
export const BufferimagetoURlimage = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.files) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const files = req.files as MulterFiles;
        if (!files || !files.cover || !files.kitchen) {
            return res.status(400).json({ success: false, message: "Missing files" });
        }
        const streamUpload = (buffer: Buffer) => {
            return new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "MessImages" },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result!.secure_url);
                    }
                );
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
    } catch (error) {
        return res.json({
            success: false,
            urls: null,
        });
    }
}

export const getAllDATA = async (req: Request, res: Response): Promise<Response> => {
    const cachekey = "AllMESS"
    const cachedata = await redisclient.get(cachekey)
    if (cachedata) return res.json({
        allmess: JSON.parse(cachedata)
    })
    const mess = await Mess.find({ messVerified: true }).populate("providerId")
    await redisclient.set(cachekey, JSON.stringify(mess))
    return res.json({
        allmess: mess
    })
}

export const GetValidMess = async (req: Request, res: Response): Promise<Response> => {
    const cachekey = "AllMESS"
    const cachedata = await redisclient.get(cachekey)
    if (cachedata) return res.json({
        allmess: JSON.parse(cachedata)
    })
    const mess = await Mess.find().populate("providerId")
    await redisclient.set(cachekey, JSON.stringify(mess))
    return res.json({
        allmess: mess
    })
}

export const Addmenus = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: "image not Uploaded yet"
            })
        }
        const bufferToDataURI = (file: Express.Multer.File) =>
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const fileDataURI = bufferToDataURI(req.file);

        const result: any = await cloudinary.uploader.upload(fileDataURI, {
            folder: "menus",
        });
        await Mess.findByIdAndUpdate(req.body?.id,
            {
                $push: {
                    Menu: {
                        types: req.body.type,
                        imageUrl: result?.secure_url,
                    }
                }
            })
        const cachekey = "AllMESS"
        await redisclient.del(cachekey)
        return res.json({
            success: true,
            message: "Menu Updated Sucessfully"
        });
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Server Error"
        })
    }
}
export const DeletetheMenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, types } = req.body;
        const mess = await Mess.findById(id);
        if (!mess) return res.status(404).json({ error: "Mess not found" });
        const menuItem = mess.Menu.id(types);
        if (!menuItem) return res.status(404).json({ error: "Menu not found" });
        if (menuItem.imageUrl) {
            await cloudinary.uploader.destroy(menuItem.imageUrl);
        }
        await menuItem.deleteOne();
        await mess.save();
        const cachekey = "AllMESS"
        await redisclient.del(cachekey)
        return res.status(200).json({
            success: true,
            message: "server not resonsing"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

// export const NotificationsPUSH = async (req: Request, res: Response) => {
//     try {
//         const providers = await Provider.find({
//             FCMtoken: { $exists: true, $ne: null }
//         });

//         if (!providers.length) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No providers with FCM tokens"
//             });
//         }

//         await Promise.all(
//             providers.map((provider) =>
//                 sendNotification(
//                     "fLMIYMbYszFGqihvV3JqXM:APA91bHv_P7VVgH6ag61GjjnigHzY8zfSHiVpLp_JI9V34lVNGtaEnXJQURib-Utjlo3dV0rd4KNJsI0EG48tLqCSqHeZkT-20QWFVuXTqVim1tBnXCiSEI",
//                     "Menu Update 🍽️",
//                     "A provider has updated the menu. Check it now!"
//                 )
//             )
//         );

//         res.json({
//             success: true,
//             message: "Notification sent to all providers"
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };


export const getAllUser = async (req: Request, res: Response) => {
    try {
        const data = await user.find()    
        return res.json({
            userData: data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: true,
            message: "server Error"
        })
    }
}
export const getAllProvider = async (req: Request, res: Response) => {
    try {
        const allProvider = await Provider.find()
        return res.json({
            ProviderData: allProvider
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Server Error To Fetch Provider"
        })
    }
}

export const verifiyMess = async (req: Request, res: Response) => {
    try {
        const { ids, verifyed } = req.body;
        await Mess.findByIdAndUpdate(ids, { messVerified: verifyed })
        const cachekey = "AllMESS"
        await redisclient.del(cachekey)
        return res.json({
            success: true,
            message: "Mess Updated Sucessfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: true,
            message: "server Error"
        })
    }
}