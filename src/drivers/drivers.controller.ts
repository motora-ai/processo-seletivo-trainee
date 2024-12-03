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
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get('/')
  getDriver() {
    return this.driversService.getDrivers();
  }

  @Get(':id')
  getDriverById(@Param('id') driverId: number) {
    const driver = this.driversService.getById(driverId);

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }

  @Post('/')
  postDriver(@Body() driver: any) {
    return this.driversService.postDriver(driver);
  }

  @Put(':id')
  putDriver(@Param('id') driverId: string, @Body() driver: any) {
    const response = this.driversService.putDriver(driver, parseInt(driverId));

    if (!response) {
      throw new NotFoundException('Driver not found');
    }

    return response;
  }

  @Delete(':id')
  deleteDriver(@Param('id') driverId: number) {
    const response = this.driversService.deleteDriver(driverId);

    if (!response) {
      throw new NotFoundException('Driver not found');
    }

    return response;
  }

  @Patch(':id')
  patchDriver(@Param('id') driverId: string, @Body() driver: any) {
    const response = this.driversService.patchDriver(driverId, driver);

    if (!response) {
      throw new NotFoundException('Driver not found');
    }

    return response;
  }
}
