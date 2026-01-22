interface IProviderInputSendOTP {
    number: string;
    otp: number;
}
declare const SENTOTPROVIDERS: ({ number, otp, }: IProviderInputSendOTP) => Promise<boolean>;
export default SENTOTPROVIDERS;
//# sourceMappingURL=FastOTP.d.ts.map