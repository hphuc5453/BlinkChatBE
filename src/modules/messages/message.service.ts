import { BadRequestException, Injectable } from "@nestjs/common";
import { SendbirdService } from "../sendbird/sendbird.service";
import { Message } from "./interfaces/message.interface";
import { ChannelType } from "../sendbird/commons/channel.type";
import { SENDBIRD_EXCEPTION } from "src/commons/strings";

@Injectable()
export class MessageService {
    constructor(private readonly sendbirdService: SendbirdService) { }

    async getChannelMessages(channelType: string, channelUrl: string, messageTs: number): Promise<Array<Message>> {

        if (!messageTs) {
            messageTs = Date.now();
        }

        if(ChannelType.GROUP !== channelType && ChannelType.OPEN !== channelType) {
            throw new BadRequestException(SENDBIRD_EXCEPTION.CHANNEL_TYPE_INVALID);
        }

        const messages = await this.sendbirdService.getChannelMessages(channelType, channelUrl, messageTs);
        return messages.map((e: any) => ({
            id: e.message_id,
            message: e.message,
            senderId: e.user != null ? Number(e.user.user_id) : 0,
            createdAt: e.created_at
        }))
    }
}