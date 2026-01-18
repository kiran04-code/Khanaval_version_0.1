import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { expressMiddleware } from "@as-integrations/express5";
import StartGraphql from "./Graphql/index.js";
import { MongoDbConnnection } from "./config/mongodb.js";
import jwtService from "./services/JwtToken.js";
import providerRoutes from "./routes/Provider.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
// MIIDDLEWARE
app.use(cors({
    credentials: true,
    origin: ["https://khanaval-version-0-1-5tyc.vercel.app", "http://localhost:8080"]
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
});
// All Neded heathCheck
app.get("/test", (req, res) => {
    res.send("Khanaval Backend is Working Perfect");
});
app.get("/", (req, res) => {
    res.send("Backend is Wroking Properly 🌐!");
});
// Graphql
app.use("/graphql", expressMiddleware(await StartGraphql(), {
    context: async ({ req, res }) => {
        const authHeader = req.headers.authorization;
        let user;
        if (typeof authHeader == "string" && authHeader.startsWith("Bearer ")) {
            const token = authHeader.replace("Bearer ", "").trim();
            try {
                user = jwtService.Jwtdecoder(token);
            }
            catch (error) {
                user = undefined;
            }
        }
        return { user };
    }
}));
// db Connection
MongoDbConnnection(`${process.env.MONGODB_URI}`).then(() => {
    console.log("Mongodb is Connected.");
}).catch((err) => {
    console.log("Mongo_error", err);
});
app.use("/api", providerRoutes);
// Server IS Listing
app.listen(PORT, () => {
    console.log(`server is runing on Port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map