import { type Response } from "express"
export const sendReponse = (res: Response, statusCode: number, message: string, responseData?: any) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        responseData
    })
}
export const senderror = (res: Response, statusCode: number, errorMessage: string, error?: any) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        errorMessage,
        error
    })
}