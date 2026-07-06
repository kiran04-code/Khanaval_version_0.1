import mongoose from "mongoose";
import { emailWorker } from "./service/email.worker.js";
import "dotenv/config"
console.log("Email worker is rining")
const start = async (url: string) => {
    try {
        await mongoose.connect(url)
        console.log("✅ MongoDB Connected");
        console.log("🚀 Email Worker Runnings");
    } catch (error) {
        console.log(error)
    }
}
start(process.env.MONGODB_URI!)

emailWorker.on("completed", (Job) => {
    console.log("Prosseing email job is completed", Job.id, Job.name)
})
