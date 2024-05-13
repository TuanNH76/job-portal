import { UserRepositoryMongoDB } from "../app/database/repositories/userRepositoryMongoDB";
import { CreateUserInterface, UserInterface } from "../types/userInterface";

export const userRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  // get user by email id
  const getUserByEmail = async (email: string) => {
    return await repository.getUserByEmail(email);
  };

  // creating new user
  const createUser = async (user: CreateUserInterface) => {
    return await repository.createUser(user);
  };

  const getUserDataById = async (id: string) => {
    const userData = await repository.getUserDataById(id);
    return userData;
  }

  const updateUser = async (userId: string, updates: Partial<UserInterface>)=> {
    const updatedUser = await repository.updateUser(userId, updates);
    return updatedUser;
  }

  const deleteResume = async (userId: string) => {
    await repository.deleteResume(userId);
  }

  return {
    getUserByEmail,
    createUser,
    getUserDataById,
    updateUser,
    deleteResume
  };
};

export type UserRepository = typeof userRepository;
