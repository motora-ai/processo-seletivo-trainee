import { Module } from '@nestjs/common';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';
import { VehiclesGateway } from './vehicles.gateway';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [VehicleService, VehiclesGateway],
  exports: [VehicleService, VehiclesGateway],
})
export class VehiclesModule { }
