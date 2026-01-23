import { type Request, type Response } from "express";
export declare const BufferimagetoURlimage: (req: Request, res: Response) => Promise<Response>;
export declare const getAllDATA: (req: Request, res: Response) => Promise<Response>;
export declare const GetValidMess: (req: Request, res: Response) => Promise<Response>;
export declare const Addmenus: (req: Request, res: Response) => Promise<Response>;
export declare const DeletetheMenu: (req: Request, res: Response) => Promise<Response>;
export declare const sendMessageToAllUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const NotificationsPUSH: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllProvider: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifiyMess: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const sendFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const finderUserByNumber: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=Provoder.d.ts.map