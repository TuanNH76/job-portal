import express from 'express';
import userController from '../../../controllers/userControllers';
import { userRepository } from '../../../repositories/userRepository';
import { UserRepositoryMongoDB } from '../../database/repositories/userRepositoryMongoDB';
import { User } from '../../database/models/userModel';
import { upload } from '../../../utils/Cloudinary';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const userMiddleware = roleMiddleware('user');

const userRouter = ()=> {
    const route = express.Router();

    const controller = userController(
        userRepository,
        UserRepositoryMongoDB,
        User
    );

    route.get('/user-data',authenticationMiddleware, userMiddleware, controller.getUserDataById);
    route.put('/update-user',authenticationMiddleware, userMiddleware, upload, controller.updateTheUser);
    route.put('/update-resume',authenticationMiddleware, userMiddleware, upload, controller.updateTheResume);
    route.delete('/delete-resume' ,authenticationMiddleware, userMiddleware, controller.userDeleteResume);
    route.get('/user-data/:userId', controller.getUserDataByIdParam);

    return route;
}

export default userRouter;  