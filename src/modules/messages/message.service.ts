import { Injectable } from "@nestjs/common";
import { SendbirdService } from "../sendbird/sendbird.service";
import { Message } from "./interfaces/message.interface";

@Injectable()
export class MessageService {
    constructor(private readonly sendbirdService: SendbirdService) { }

    async getChannelMessages(channelType: string, channelUrl: string, messageTs: number): Promise<Array<Message>> {
        const messages = await this.sendbirdService.getChannelMessages(channelType, channelUrl, messageTs);
        return messages.map((e: any) => ({
            id: e.message_id,
            message: e.message,
            senderId: e.user != null ? Number(e.user.user_id) : 0,
            createdAt: e.created_at
        }))
    }
}