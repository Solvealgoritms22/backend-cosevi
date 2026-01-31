import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SpacesModule } from './spaces/spaces.module';
import { VisitsModule } from './visits/visits.module';
import { LprModule } from './lpr/lpr.module';
import { PrismaModule } from './prisma.module';
import { EmergenciesModule } from './emergencies/emergencies.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportsModule } from './reports/reports.module';
import { UploadsModule } from './uploads/uploads.module';
import { SocketModule } from './socket.module';
import { Request, Response, NextFunction } from 'express';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'uploads'),
            serveRoot: '/uploads',
        }),
        PrismaModule,
        AuthModule,
        UsersModule,
        SpacesModule,
        VisitsModule,
        LprModule,
        EmergenciesModule,
        NotificationsModule,
        ReportsModule,
        SocketModule,
        UploadsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply((req: Request, res: Response, next: NextFunction) => {
                const { method, originalUrl } = req;
                const userAgent = req.get('user-agent') || '';

                res.on('finish', () => {
                    const { statusCode } = res;
                    const contentLength = res.get('content-length');
                    console.log(
                        `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent}`,
                    );
                });
                next();
            })
            .forRoutes('*');
    }
}
