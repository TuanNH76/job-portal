import express from "express";
import jobController from "../../../controllers/jobControllers";
import { jobRepository } from "../../../repositories/jobRepository";
import { JobRepositoryMongoDB } from "../../database/repositories/jobRepositoryMongoDB";
import { Job } from "../../database/models/jobModel";
import roleMiddleware from "../middleware/roleMiddleware";

const userMiddleware = roleMiddleware('user');
const employerMiddleware = roleMiddleware('employer');


const jobRouter = () => {
    const route = express.Router();

    const controller = jobController(
        jobRepository,
        JobRepositoryMongoDB,
        Job
    );

    route.get('/employer-jobs',employerMiddleware, controller.getJobsByEmployer);
    route.post('/create-job',employerMiddleware, controller.createNewJob);
    route.put('/update-job/:id',employerMiddleware, controller.updateTheJob);
    route.delete('/delete-job/:id',employerMiddleware, controller.deleteTheJob);
    route.get('/all-jobs',userMiddleware, controller.findAllJobs);
    route.get('/job-data/:id', controller.jobDataById);
    route.get('/distinct/:field',userMiddleware, controller.titleLocationSalary);
    route.post('/filter-jobs',userMiddleware, controller.filterJobs);

    return route;
}

export default jobRouter;