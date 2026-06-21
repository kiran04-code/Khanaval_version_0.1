import type { Request, Response, NextFunction } from "express";
import jwtService from "../services/JwtToken.js";
export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headeToken = await req.headers?.authorization
        const token = headeToken?.split(" ")[1]
        if (!token) {
            return next();
        }
        const data = jwtService.Jwtdecoder(token);
        req.CloudeUser = {
            id: data?._id!,
            providerName: data?.providerName!,
            phoneNumber: data?.phoneNumber!,
            role: data?.role!,
        };
        return next()
    } catch (error) {
        return next()
    }
}