import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { SendbirdService } from "./sendbird.service";

@Global()
@Module({
    imports: [HttpModule],
    providers: [SendbirdService],
    exports: [SendbirdService]
})
export class SenbirdModule {}