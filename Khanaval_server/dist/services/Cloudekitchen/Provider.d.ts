export declare class Provider {
    static SendOtp(phoneNumber: string): Promise<void>;
    static VerifiedOtp(phoneNumber: string, otp: string, providerName: string): Promise<string>;
}
//# sourceMappingURL=Provider.d.ts.map