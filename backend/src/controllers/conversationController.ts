import { Request, Response } from "express";
import { ConversationInterface } from "../types/messengerInterface";
import { ConversationModel } from "../app/database/models/conversationModel";
import { ConversationRepositoryMongoDB } from "../app/database/repositories/conversationRepositioryMongoDB";
import { ConversationRepository } from "../repositories/conversationRepository";
import { newConversation, getConversation } from "../services/messenger/conversationService";
import expressAsyncHandler from "express-async-handler";

const conversationController = (
    conversationDbRepository: ConversationRepository,
    conversationDbRepositoryImpl: ConversationRepositoryMongoDB,
    conversationModel: ConversationModel
) => {
    const dbRepositoryConversation = conversationDbRepository(
        conversationDbRepositoryImpl(conversationModel)
    );

    const createConversation = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const conversation: ConversationInterface = {
                members: [req?.body?.senderId, req?.body?.receiverId],
            };
            const newCon = await newConversation(conversation, dbRepositoryConversation);
            res.json(newCon);
        }
    );

    const findConversation = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id ?? '';
            if(!id) {
                throw new Error ('id not found');
            }
            const conversation = await getConversation(id, dbRepositoryConversation);
            res.json(conversation);
        }
    )

    return {
        createConversation,
        findConversation,
    }
};

export default conversationController;