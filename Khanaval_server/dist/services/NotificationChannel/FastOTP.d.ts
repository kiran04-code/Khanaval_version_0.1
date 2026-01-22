interface IProviderInputSendOTP {
    number: string;
    otp: number;
}
declare const sendOTPFast2SMS: ({ number, otp, }: IProviderInputSendOTP) => Promise<boolean>;
export default sendOTPFast2SMS;
//# sourceMappingURL=FastOTP.d.ts.map