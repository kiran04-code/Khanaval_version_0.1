import axios from "axios";
export const googlerespose = async (googletoken) => {
    if (!googletoken) {
        throw new Error("Google token missing");
    }
    try {
        const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${googletoken}`;
        const { data } = await axios.get(url);
        return data;
    }
    catch (err) {
        console.error("Google verify failed:", err.response?.data || err.message);
        throw new Error("Invalid Google token");
    }
};
//# sourceMappingURL=GoogleResponse.js.map