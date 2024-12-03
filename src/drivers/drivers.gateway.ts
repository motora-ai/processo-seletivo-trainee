import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway({
    namespace: 'drivers/ws',
    cors: {
        origin: '*',
    }
})
export class DriversGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
    }

    sendCreated(driver: any) {
        this.server.emit('driver-created', {
            data: driver,
        });
    }

    sendDeleted(driver: any) {
        this.server.emit('driver-deleted', {
            data: driver,
        });
    }

    sendUpdated(driver: any) {
        this.server.emit('driver-updated', {
            data: driver,
        })
    }
}