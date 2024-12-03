import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { DriversModule } from 'src/drivers/drivers.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { TravelsGateway } from './travels.gateway';

@Module({
  controllers: [TravelsController],
  providers: [TravelsService, TravelsGateway],
  imports: [DriversModule, VehiclesModule],
})
export class TravelsModule { }
