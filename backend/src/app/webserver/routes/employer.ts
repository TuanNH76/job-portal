import express from 'express';
import employerController from '../../../controllers/employerController';
import { employerRepository } from '../../../repositories/employerRepository';
import { EmployerRepositoryMongoDB } from '../../database/repositories/employerRepositoryMongoDB';
import { Employer } from '../../database/models/employerModel';
import { upload } from '../../../utils/Cloudinary';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const employerMiddleware = roleMiddleware('employer');


const employerRouter = () => {
    const route = express.Router();

    const controller = employerController(
        employerRepository,
        EmployerRepositoryMongoDB,
        Employer
    );

    route.get('/employer-data',authenticationMiddleware, employerMiddleware, controller.getEmployerById);
    route.put('/update-employer',authenticationMiddleware, employerMiddleware, upload, controller.updateEmployer);
    route.get('/employer-data/:empId', controller.getEmployerByIdParam);

    return route;
}

export default employerRouter;