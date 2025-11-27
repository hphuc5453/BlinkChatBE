import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";

@Module({
    exports: [MessageService],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule { }