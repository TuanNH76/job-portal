import express from "express";
import authController from "../../../controllers/userAuthControllers";
import { userRepository } from "../../../repositories/userRepository";
import { UserRepositoryMongoDB } from "../../database/repositories/userRepositoryMongoDB";
import { auth } from "../../../utils/auth";
import { authService } from "../../../services/auth/authService";
import { User } from "../../database/models/userModel";
// import {googleAuthService } from "../../../utils/googleAuthService";
// import { googleAuthService } from "../../../services/auth/googleAuthService";

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
  // route.post("/sign-in-with-google", controller.signWithGoogle);

  return route;
};

export default userAuthRouter;
