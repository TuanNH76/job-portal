import express from "express";
import authController from "../../../controllers/userAuthControllers";
import { userRepository } from "../../../repositories/userRepository";
import { UserRepositoryMongoDB } from "../../database/repositories/userRepositoryMongoDB";
import { auth } from "../../../utils/auth";
import { authService } from "../../../services/auth/authService";
import { User } from "../../database/models/userModel";


const userAuthRouter = () => {
    const route = express.Router();

    const controller = authController(
        authService,
        auth,
        userRepository,
        UserRepositoryMongoDB,
        User,
    );

    route.post("/register", controller.userRegister);
    route.post("/login", controller.loginUser);

    return route;
};

export default userAuthRouter;