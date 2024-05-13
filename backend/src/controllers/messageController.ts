import { Request, Response } from "express";
import { MessagesInterface } from "../types/messengerInterface";
import { MessageRepositoryMongoDB } from "../app/database/repositories/messageRepositoryMongoDB";
import { MessageRepository } from "../repositories/messageRepository.";
import { MessageModel } from "../app/database/models/messageModel";
import { newMessage, getMessages } from "../services/messenger/messageService";
import expressAsyncHandler from "express-async-handler";

const messageController = (
    messageDbRepository: MessageRepository,
    messageDbRepositoryImpl: MessageRepositoryMongoDB,
    messageModel: MessageModel
) => {
    const dbRepositoryMessage = messageDbRepository(messageDbRepositoryImpl(messageModel));

    const saveMessage = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const message = req?.body ?? {};
            const messages = await newMessage(message, dbRepositoryMessage);
            res.json(messages);
        }
    )

    const getConversationMessages = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const conversationId = req?.params?.conId ?? ''
            if (!conversationId) {
                throw new Error('No conversation id found');
            }
            const messages = await getMessages(conversationId, dbRepositoryMessage);
            res.json(messages);
        }
    )

    return {
        saveMessage,
        getConversationMessages
    }
}

export default messageController;