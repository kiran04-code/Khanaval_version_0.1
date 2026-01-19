import { response, type Request, type Response } from "express"
import cloudinary from "../config/cloudnary.js";
import Mess from "../model/Mess.js";
import { redisclient } from "../config/redis.js";
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

export const Addmenus = async (req: Request, res: Response): Promise<Response> => {
 return res.json({
    success:false,
    message:"Menu Updated Sucessfully"
 });
}