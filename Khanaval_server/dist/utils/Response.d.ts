import { type Response } from "express";
export declare const sendReponse: (res: Response, statusCode: number, message: string, responseData?: any) => Response<any, Record<string, any>>;
export declare const senderror: (res: Response, statusCode: number, errorMessage: string, error?: any) => Response<any, Record<string, any>>;
//# sourceMappingURL=Response.d.ts.map