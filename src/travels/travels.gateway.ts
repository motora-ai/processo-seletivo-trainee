import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';


@WebSocketGateway({
    namespace: 'travels/ws',
    cors: {
        origin: '*',
    },
})
export class TravelsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
    }

    sendCreated(travel: any) {
        this.server.emit('travel-created', {
            data: travel,
        });
    }

    sendDeleted(travel: any) {
        this.server.emit('travel-deleted', {
            data: travel,
        });
    }

    sendUpdated(travel: any) {
        this.server.emit('travel-update', {
            data: travel,
        })
    }
}