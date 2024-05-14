import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../utils/auth";
import { AuthServiceInterface } from "../services/auth/authService";
import { UserRepository } from "../repositories/userRepository";
import { UserRepositoryMongoDB } from "../app/database/repositories/userRepositoryMongoDB";
import { userLogin, registerUser} from "../services/auth/userAuthService";
import { CreateUserInterface, UserInterface } from "../types/userInterface";
import { UserModel } from "../app/database/models/userModel";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserRepository,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  userModel: UserModel,

) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));
  const authService = authServiceInterface(authServiceImpl());

  const userRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const user: CreateUserInterface = req?.body;
      await registerUser(user, dbRepositoryUser, authService);
      res.json({
        status: "success",
        message: "user registered successfully",
      });
    }
  );

  const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "user verified",
      token,
    });
  });

  // const signWithGoogle = expressAsyncHandler(async (req: Request, res: Response) => {
  //   const {credential} : {credential: string} = req.body;
  //   const token = await signInWithGoogle(credential, googleAuthService, dbRepositoryUser, authService);
  //   res.json({
  //     status: "success",
  //     message: "user verified",
  //     token
  //   })
  // })

  return {
    loginUser,
    userRegister
  };
};

export default authController;
