import express from 'express';
import conversationController from '../../../controllers/conversationController';
import { conversationRepository } from '../../../repositories/conversationRepository';
import { conversationRepositoryMongoDB } from '../../database/repositories/conversationRepositioryMongoDB';
import { Conversation } from '../../database/models/conversationModel';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

const conversationRouter = () => {
    const route = express.Router();

    const controller = conversationController(
        conversationRepository,
        conversationRepositoryMongoDB,
        Conversation
    );

    route.post('/', controller.createConversation);
    route.get('/:id',authenticationMiddleware, controller.findConversation);

    return route;
}

export default conversationRouter;