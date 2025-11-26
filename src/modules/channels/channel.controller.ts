import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChatChannel } from "./interfaces/channel.interface";
import { JwtGuard } from "../auth/guards/jwt-auth.guard";

@Controller('channels')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    async getChannelsByUser(@Req() req): Promise<Array<ChatChannel>> {
        return await this.channelService.getChannelsByUser(req.user.id)
    }
}
