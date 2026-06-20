import {} from "express";
export const sendReponse = (res, statusCode, message, responseData) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        responseData
    });
};
export const senderror = (res, statusCode, errorMessage, error) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        errorMessage,
        error
    });
};
//# sourceMappingURL=Response.js.map