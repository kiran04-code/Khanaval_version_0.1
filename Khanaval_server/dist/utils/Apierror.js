export class ApiError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode,
            Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=Apierror.js.map