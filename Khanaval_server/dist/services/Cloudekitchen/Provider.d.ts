export declare class Provider {
    static SendOtp(phoneNumber: string): Promise<void>;
    static VerifiedOtp(phoneNumber: string, otp: string, providerName: string): Promise<string>;
    static LoginSendOtp(phoneNumber: string): Promise<void>;
    static LoginVerifiedOtp(phoneNumber: string, otp: string): Promise<string>;
}
//# sourceMappingURL=Provider.d.ts.map