import { Module } from '@nestjs/common';
import { SocketModule } from '../socket.module';
import { EmergenciesService } from './emergencies.service';
import { EmergenciesController } from './emergencies.controller';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [SocketModule],
    controllers: [EmergenciesController],
    providers: [EmergenciesService],
})
export class EmergenciesModule { }
