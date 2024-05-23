import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { VehicleService } from './vehicles.service';

@WebSocketGateway({
  namespace: 'ws',
  cors: {
    origin: '*',
  },
})
export class VehiclesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private vehicleService: VehicleService) {}

  @SubscribeMessage('vehicles')
  findAll(): Observable<any> {
    return of(this.vehicleService.getVehicles());
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    client.interval = setInterval(() => {
      this.server.emit('vehicle-position-update', {
        data: this.vehicleService.generateRandomVehicleData(),
      });
    }, 1000);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    clearInterval(client.interval);
  }
}
