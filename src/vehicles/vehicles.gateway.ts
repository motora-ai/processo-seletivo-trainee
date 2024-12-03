import {
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VehicleService } from './vehicles.service';
import { OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: 'vehicles/ws',
  cors: {
    origin: '*',
  },
})
export class VehiclesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
    // client.interval = setInterval(() => {
    //   this.server.emit('vehicle-position-update', {
    //     data: this.vehicleService.generateRandomVehicleData(),
    //   });
    // }, 1000);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    // clearInterval(client.interval);
  }

  sendCreated(vehicle: any) {
    this.server.emit('vehicle-created', {
      data: vehicle,
    });
  }

  sendUpdated(vehicle: any) {
    this.server.emit('vehicle-updated', {
      data: vehicle,
    });
  }

  sendDeleted(vehicle: any) {
    this.server.emit('vehicle-deleted', {
      data: vehicle,
    });
  }

}
