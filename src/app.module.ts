import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DriversModule } from './drivers/drivers.module';
import { TravelsModule } from './travels/travels.module';

@Module({
  imports: [VehiclesModule, DriversModule, TravelsModule],
})
export class AppModule {}
