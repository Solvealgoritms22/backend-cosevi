import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: ['https://frontend-cosevi.vercel.app', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:4200'],
        credentials: true,
    },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    emitVisitUpdate(data: any) {
        this.server.emit('visitUpdate', data);
    }

    emitStatusUpdate(data: any) {
        this.server.emit('statusUpdate', data);
    }
}
