import cloudinary from "../config/cloudnary.js";
export const BufferimagetoURlimage = async (req, res) => {
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
};
//# sourceMappingURL=Provoder.js.map