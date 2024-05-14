import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";
import { UserRepository } from "../../repositories/userRepository";
import { UserInterface } from "../../types/userInterface";

export const findByEmail = async (
  email: string,
  dbRepositoryUser: ReturnType<UserRepository>
) => {
  try {
    const user = await dbRepositoryUser.getUserByEmail(email);
    if (!user) {
      throw new AppError("user not found", HttpStatus.BAD_REQUEST);
    }
    return user;
  } catch (error) {
    throw new Error("failed to find the user");
  }
};

export const findUserDataById = async (
  id: string,
  dbRepositoryUser: ReturnType<UserRepository>
) => {
  try {
    const userData = await dbRepositoryUser.getUserDataById(id);
    if (!userData) {
      throw new AppError("user not found", HttpStatus.BAD_REQUEST);
    }
    return userData;
  } catch (error) {
    throw new Error("failed to get the user data");
  }
};

export const updateUser = async (
  userId: string,
  updates: Partial<UserInterface>,
  dbRepositoryUser: ReturnType<UserRepository>
) => {
  try {
    const updatedUser = await dbRepositoryUser.updateUser(userId, updates);
    if(!updatedUser) {
      throw new AppError('not found', HttpStatus.BAD_GATEWAY);
    }
    return updatedUser;
  } catch (error) {
    console.log(error)
    throw new Error("failed to update the user");
  }
};

export const updateResume = async (
  userId: string,
  updates: Partial<UserRepository>,
  dbRepositoryUser: ReturnType<UserRepository> 
) => {
  try {
    const updateResume = await dbRepositoryUser.updateUser(userId, updates);
    if(!updateResume) {
      throw new AppError('not found', HttpStatus.BAD_GATEWAY);
    }
    return updateResume;
  } catch (error) {
    throw new Error("failed to update resume");
  }
}

export const deleteResume = async(
  userId: string,
  dbRepositoryUser: ReturnType<UserRepository>
) => {
  try {
    await dbRepositoryUser.deleteResume(userId);
  } catch (error) {
    throw new Error('failed to delete the resume');
  }
}
