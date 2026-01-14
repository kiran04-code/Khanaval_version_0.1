import axios from "axios"
import type { GoogleAuthPayload } from "../Graphql/user/types.js"

export const googlerespose = async (googletoken: string) => {
    if (!googletoken) {
    throw new Error("Google token missing");
  }

  try {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${googletoken}`;

    const { data } = await axios.get<GoogleAuthPayload>(url);
    return data;
  } catch (err: any) {
    console.error("Google verify failed:", err.response?.data || err.message);
    throw new Error("Invalid Google token");
  }
}