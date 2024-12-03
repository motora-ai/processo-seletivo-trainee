import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { DriversModule } from 'src/drivers/drivers.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  controllers: [TravelsController],
  providers: [TravelsService],
  imports: [DriversModule, VehiclesModule],
})
export class TravelsModule {}
