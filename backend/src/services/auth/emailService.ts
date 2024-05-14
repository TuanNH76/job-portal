import { SendEmailService } from "../../utils/email";

export const emailService = (
    service: ReturnType<SendEmailService>
) => {
    const sendOtpEmail = (email: string) => {
        service.sendEmail(email);
    }

    const verifyOTP = (OTP: string) => {
        const response = service.verifyOTP(OTP);
        return response;
    }

    return {
        sendOtpEmail,
        verifyOTP
    }
}

export type EmailServiceInterface = typeof emailService;