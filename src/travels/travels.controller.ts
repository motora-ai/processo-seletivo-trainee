import {
  BadRequestException,
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
import { TravelsService } from './travels.service';

@Controller('travels')
export class TravelsController {
  constructor(private travelsService: TravelsService) { }

  @Get('/')
  getTravel() {
    return this.travelsService.getTravels();
  }

  @Get(':id')
  getTravelById(@Param('id') travelId: number) {
    const travel = this.travelsService.getById(travelId);

    if (!travel) {
      throw new NotFoundException('Travel not found');
    }

    return travel;
  }

  @Post('/')
  postTravel(@Body() travel: any) {
    return this.travelsService.postTravel(travel);
  }

  @Put(':id')
  putTravel(@Param('id') travelId: string, @Body() travel: any) {
    const response = this.travelsService.putTravel(travel, parseInt(travelId));

    if (!response) {
      throw new NotFoundException('Travel not found');
    }

    return response;
  }

  @Delete(':id')
  deleteTravel(@Param('id') travelId: number) {
    const response = this.travelsService.deleteTravel(travelId);

    if (!response) {
      throw new NotFoundException('Travel not found');
    }

    return response;
  }

  @Patch(':id')
  patchTravel(@Param('id') travelId: string, @Body() travel: any) {
    const response = this.travelsService.patchTravel(parseInt(travelId), travel);

    if (!response) {
      throw new NotFoundException('Travel not found');
    }

    return response;
  }

  @Post('/beginTravel')
  beginTravel(@Body() travel: any) {
    const response = this.travelsService.beginTravel(travel);

    if (!response) {
      throw new BadRequestException('Some error happened');
    }

    return response;
  }

  @Post('/generateTravel')
  generateRandomTravel() {
    const response = this.travelsService.generateRandomTravel();

    return response;
  }

  @Post('/stopTravel/:id')
  stopTravel(@Param('id') travelId: string) {
    const response = this.travelsService.stopTravel(parseInt(travelId));

    if (!response) {
      throw new NotFoundException('Travel not found');
    }

    return response;
  }

  @Get('/travelsByDriver/:id')
  getTravelsByDriver(@Param('id') driverId: string) {
    const response = this.travelsService.getTravelsByDriver(parseInt(driverId));

    return response;
  }

  @Get('/travelsByVehicle/:id')
  getTravelsByVehicle(@Param('id') vehicleId: string) {
    const response = this.travelsService.getTravelsByVehicle(parseInt(vehicleId));

    return response;
  }

  @Get('/travelsByStatus/:status')
  getTravelsByStatus(@Param('status') travelStatus: string) {
    const response = this.travelsService.getTravelsByStatus(travelStatus);

    return response;
  }
}
