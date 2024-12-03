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
import { TravelsService } from './travels.service';

@Controller('travels')
export class TravelsController {
  constructor(private travelsService: TravelsService) {}

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
    const response = this.travelsService.patchTravel(travelId, travel);

    if (!response) {
      throw new NotFoundException('Travel not found');
    }

    return response;
  }
}
