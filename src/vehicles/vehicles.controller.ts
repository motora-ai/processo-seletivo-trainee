import { Controller, Get } from '@nestjs/common';
import { VehicleService } from './vehicles.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get('/')
  getVehicle() {
    return this.vehicleService.getVehicles();
  }
}
