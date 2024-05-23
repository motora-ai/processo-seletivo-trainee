import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicles/vehicles.module';

@Module({
  imports: [VehicleModule],
})
export class AppModule {}
