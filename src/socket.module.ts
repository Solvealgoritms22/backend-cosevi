import { Global, Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { PusherService } from './pusher.service';

@Global()
@Module({
    providers: [AppGateway, PusherService],
    exports: [AppGateway, PusherService],
})
export class SocketModule { }
