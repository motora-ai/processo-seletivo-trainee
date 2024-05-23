import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleController } from './vehicles/vehicles.controller';
import { VehicleService } from './vehicles/vehicles.service';
import { VehicleModule } from './vehicles/vehicles.module';

@Module({
  imports: [VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
