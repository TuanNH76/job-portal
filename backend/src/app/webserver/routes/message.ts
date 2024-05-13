import express from 'express';
import messageController from '../../../controllers/messageController';
import { messageRepositoryMongoDB } from '../../database/repositories/messageRepositoryMongoDB';
import { messageRepository } from '../../../repositories/messageRepository.';
import { Message } from '../../database/models/messageModel';



const messageRouter = () => {
    const route = express.Router();

    const controller = messageController(
        messageRepository,
        messageRepositoryMongoDB,
        Message
    );

    route.post('/', controller.saveMessage);
    route.get('/:conId', controller.getConversationMessages);

    return route;
}

export default messageRouter;