import QRCode from "qrcode";
import cloudinary from "../../../config/cloudnary.js";
import type mongoose from "mongoose";


export const Qrcodegenerator = async (messId:mongoose.Types.ObjectId | string) => {
  const qrText = `MESS_QR:${messId}`;

  const base64 = await QRCode.toDataURL(qrText);

  const upload = await cloudinary.uploader.upload(base64, {
    folder: "mess_qr"
  });

  return upload.secure_url; // 👈 THIS is qrReturn
};
