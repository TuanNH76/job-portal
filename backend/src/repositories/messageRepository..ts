import { MessagesInterface } from "../types/messengerInterface";
import { MessageRepositoryMongoDB } from "../app/database/repositories/messageRepositoryMongoDB";

export const messageRepository = (
    repository: ReturnType<MessageRepositoryMongoDB>
) => {
    const newMessage = async (message: MessagesInterface) => {
        const messages = await repository.newMessage(message);
        return messages;
    }

    const getMessages = async (conversationId: string) => {
        const messages = await repository.getMessages(conversationId);
        return messages;
    }

    return {
        newMessage,
        getMessages
    }
}

export type MessageRepository = typeof messageRepository;