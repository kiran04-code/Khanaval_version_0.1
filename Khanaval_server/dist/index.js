import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { expressMiddleware } from "@as-integrations/express5";
import StartGraphql from "./Graphql/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
// MIIDDLEWARE
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get("/graphql", expressMiddleware(await StartGraphql()));
app.listen(PORT, () => {
    console.log(`server is runing on Port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map