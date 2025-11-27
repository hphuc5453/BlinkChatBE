import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { Message } from "./interfaces/message.interface";
import { JwtGuard } from "../auth/guards/jwt-auth.guard";

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get(':channel_type/:channel_url')
    @UseGuards(JwtGuard)
    async getChannelMessages(
        @Param('channel_type') channelType: string,
        @Param('channel_url') channelUrl: string,
        @Query('message_ts') messageTs: number
    ): Promise<Array<Message>> {
        return await this.messageService.getChannelMessages(channelType, channelUrl, messageTs);
    }
}