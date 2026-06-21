import { type Request, type Response } from "express";
export declare const SendOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginSendOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginverifyOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCloudeCurrentUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=Owener.d.ts.map