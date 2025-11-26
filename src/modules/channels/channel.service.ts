import { Injectable } from "@nestjs/common";
import { SendbirdService } from "../sendbird/sendbird.service";
import { ChatChannel } from "./interfaces/channel.interface";

@Injectable()
export class ChannelService {

    constructor(private readonly sendbirdService: SendbirdService) { }

    async getChannelsByUser(userId: number): Promise<Array<ChatChannel>> {
        const channels = await this.sendbirdService.getChannelsByUser(userId);
        return channels.map((e: any) => ({
            id: e.id,
            name: e.name,
            lastMessage: e.last_message.message
        }))
    }
}