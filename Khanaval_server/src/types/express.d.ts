declare global {
  namespace Express {
    interface Request {
      CloudeUser?: {
        id: string ;
        providerName: string;
        phoneNumber: string;
        role: string;
        ispaymentDone:Boolean
      };
    }
  }
}

export {};