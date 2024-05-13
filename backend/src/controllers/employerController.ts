import { Request, Response } from "express";
import { CustomRequest } from "../types/expressRequest";
import { EmployerRepository } from "../repositories/employerRepository";
import { EmployerRepositoryMongoDB } from "../app/database/repositories/employerRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { EmployerModel } from "../app/database/models/employerModel";
import { EmployerInterface } from "../types/employerInterface";
import AppError from "../utils/appError";
import { HttpStatus } from "../types/httpStatus";
import {
    updatedEmployer,
    findEmployerById,
} from "../services/employer/employerService";

const employerController = (
    employerDbRepository: EmployerRepository,
    employerDbRepositoryImpl: EmployerRepositoryMongoDB,
    employerModel: EmployerModel
) => {
    const dbRepositoryEmployer = employerDbRepository(
        employerDbRepositoryImpl(employerModel)
    );

    //for getting the data with token data.
    const getEmployerById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const employerData = await findEmployerById(id, dbRepositoryEmployer);
            res.json({ status: "success", employerData });
        }
    );
    //for getting the data with id only.
    const getEmployerByIdParam = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const employerId = req.params.empId;
            const employerData = await findEmployerById(
                employerId,
                dbRepositoryEmployer
            );
            res.json(employerData);
        }
    );

    const updateEmployer = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const employerId = customReq.payload ?? "";
            if (!employerId) {
                throw new AppError(
                    "unauthorized request, invalid token",
                    HttpStatus.UNAUTHORIZED
                );
            }
            const updates: EmployerInterface = req.body;
            if (req?.file?.path) {
                updates.image = req?.file?.path;
            }
            const updateEmployerData = await updatedEmployer(
                employerId,
                updates,
                dbRepositoryEmployer
            );

            res.json({
                status: "success",
                updateEmployerData,
            });
        }
    );

    return {
        getEmployerById,
        updateEmployer,
        getEmployerByIdParam,
    };
};

export default employerController;