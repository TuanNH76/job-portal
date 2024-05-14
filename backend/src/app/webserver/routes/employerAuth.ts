import express from "express";
import employerAuthController from "../../../controllers/employerAuthController";
import { employerRepository } from "../../../repositories/employerRepository";
import { EmployerRepositoryMongoDB } from "../../database/repositories/employerRepositoryMongoDB";
import { auth } from "../../../utils/auth";
import { authService } from "../../../services/auth/authService";
import {Employer} from "../../database/models/employerModel";
import { emailService } from "../../../services/auth/emailService";
import { sendEmailService } from "../../../utils/email";

const employerAuthRouter = () => {
    const route = express.Router();

    const controller = employerAuthController(
        authService,
        auth,
        employerRepository,
        EmployerRepositoryMongoDB,
        Employer,
        emailService,
        sendEmailService
    );

    route.post("/register", controller.employerRegister);
    route.post("/login", controller.loginEmployer);
    route.get("/email-verify/:emailId", controller.emailVerification);
    route.get("/email-OTP/:OTP", controller.OTPVerification);

    return route;
};

export default employerAuthRouter;