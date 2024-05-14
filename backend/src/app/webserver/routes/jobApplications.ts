import express from 'express';
import { jobApplicationRepository } from '../../../repositories/jobApplicationRepository';
import { JobApplicationRepositoryMongoDB } from '../../database/repositories/jobApplicationRepositoryMongoDB';
import { JobApplication } from '../../database/models/jobApplicationModel';
import jobApplicationController from '../../../controllers/jobApplicationController';
import roleMiddleware from "../middleware/roleMiddleware";

const userMiddleware = roleMiddleware('user');
const employerMiddleware = roleMiddleware('employer');

const jobApplicationRouter = () => {
    const route = express.Router();

    const controller = jobApplicationController(
        jobApplicationRepository,
        JobApplicationRepositoryMongoDB,
        JobApplication
    );

    route.post('/create-application',userMiddleware, controller.applyNewJob);
    route.get('/is-applied', controller.existingApplicant);
    route.get('/all-applications',employerMiddleware, controller.jobApplicationForEmployer);
    route.get('/applicant-details/:id', controller.jobApplicationDetails);
    route.patch('/change-status/:id',employerMiddleware, controller.changeTheApplicationStatus);
    route.get('/user-applications',userMiddleware, controller.userApplications);

    return route;
}

export default jobApplicationRouter;