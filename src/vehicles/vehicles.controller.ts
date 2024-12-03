import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) { }

  @Get('/')
  getVehicle() {
    return this.vehicleService.getVehicles();
  }

  @Get(':id')
  getVehicleById(@Param('id') vehicleId: number) {
    const vehicle = this.vehicleService.getById(vehicleId);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  @Post('/')
  postVehicle(@Body() vehicle: any) {
    return this.vehicleService.postVehicle(vehicle);
  }

  @Post('/moveVehicle/:id')
  moveVehicle(@Param('id') vehicleId: string) {
    return this.vehicleService.moveVehicle(parseInt(vehicleId));
  }

  @Put(':id')
  putVehicle(@Param('id') vehicleId: string, @Body() vehicle: any) {
    const response = this.vehicleService.putVehicle(
      vehicle,
      parseInt(vehicleId),
    );

    if (!response) {
      throw new NotFoundException('Vehicle not found');
    }

    return response;
  }

  @Delete(':id')
  deleteVehicle(@Param('id') vehicleId: number) {
    const response = this.vehicleService.deleteVehicle(vehicleId);

    if (!response) {
      throw new NotFoundException('Vehicle not found');
    }

    return response;
  }

  @Patch(':id')
  patchVehicle(@Param('id') vehicleId: string, @Body() vehicle: any) {
    const response = this.vehicleService.patchVehicle(parseInt(vehicleId), vehicle);

    if (!response) {
      throw new NotFoundException('Vehicle not found');
    }

    return response;
  }

  @Get('/vehiclesByStatus/:status')
  getVehiclesByStatus(@Param('status') status: string): any[] {
    return this.vehicleService.getVehiclesByStatus(status);
  }

}
