import { AuthServiceReturn } from "../../utils/auth";

export const authService = (service: AuthServiceReturn) => {
  const encryptPassword = (password: string) =>
    service.encryptPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const generateToken = (payload: string, role: string) => service.generateToken({payload, role});

  const verifyToken = (token: string) => service.verifyToken(token);

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken,
  };
};

export type AuthServiceInterface = typeof authService;
