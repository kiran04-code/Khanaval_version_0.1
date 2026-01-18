import { config } from "dotenv";
import mongoose from "mongoose";
config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}
export async function connectDB() {
    // ✅ Already connected
    if (cached.conn) {
        return cached.conn;
    }
    // ✅ First-time connection
    if (!cached.promise) {
        console.log("⏳ Connecting to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI);
    }
    cached.conn = await cached.promise;
    // ✅ Log ONLY once (first successful connection)
    if (cached.conn) {
        console.log("✅ MongoDB connected successfully");
    }
    return cached.conn;
}
//# sourceMappingURL=mongodb.js.map