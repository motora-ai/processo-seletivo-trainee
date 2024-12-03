import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DriversService } from 'src/drivers/drivers.service';
import { VehicleService } from 'src/vehicles/vehicles.service';
import { TravelsGateway } from './travels.gateway';

@Injectable()
export class TravelsService {
  private lastUsedId: number = 3;
  private readonly travels: any[];
  constructor(
    private driversService: DriversService,
    private vehiclesService: VehicleService,
    private travelsGateway: TravelsGateway,
  ) {
    this.travels = JSON.parse(
      readFileSync(
        join(process.cwd(), 'src/travels/travels.data.json'),
        'utf8',
      ),
    );
  }

  getTravels(): any[] {
    return this.travels;
  }

  getById(id: number): any {
    return this.travels.find((v) => v.id == id);
  }

  postTravel(travel: any): any {
    travel.id = ++this.lastUsedId;
    travel.driverId = travel.driverId || -1;
    travel.vehicleId = travel.vehicleId || -1;
    travel.start = travel.start || new Date();
    travel.status = travel.status || travel.end ? 'finished' : 'ongoing';
    travel.end = travel.end || undefined;
    this.travels.push(travel);

    this.travelsGateway.sendCreated(travel);
    return travel;
  }

  putTravel(travel: any, id: number): any {
    const index = this.travels.findIndex((v) => v.id == id);

    if (index === -1) {
      return null;
    }

    travel.id = id;
    travel.driverId = travel.driverId || -1;
    travel.vehicleId = travel.vehicleId || -1;
    travel.start = travel.start || new Date();
    travel.status = travel.status || travel.end ? 'finished' : 'ongoing';
    travel.end = travel.end || undefined;

    this.travels[index] = travel;

    this.travelsGateway.sendUpdated(travel);
    return travel;
  }

  deleteTravel(travelId: number): any {
    const index = this.travels.findIndex((v) => v.id == travelId);

    if (index === -1) {
      return null;
    }
    const travel = this.travels[index];
    this.travels.splice(index, 1);

    this.travelsGateway.sendDeleted(travel);
    return travel;
  }

  patchTravel(travelId: number, travel: any): any {
    const index = this.travels.findIndex((v) => v.id == travelId);
    if (index === -1) {
      return null;
    }
    const updatedTravel = { ...this.travels[index], ...travel };
    updatedTravel.id = travelId;
    this.travels[index] = updatedTravel;

    this.travelsGateway.sendUpdated(updatedTravel);
    return updatedTravel;
  }

  generateRandomTravel(): any {
    const driversList = this.driversService.getDrivers().filter(driver => driver.status === 'idle');
    const randomDriver =
      driversList[Math.floor(Math.random() * driversList.length)];

    if (!randomDriver) {
      throw new BadRequestException('No driver available to drive in the Travel');
    }

    const vehiclesList = this.vehiclesService.getVehicles().filter(vehicle => vehicle.status === 'stopped');
    const randomVehicle =
      vehiclesList[Math.floor(Math.random() * vehiclesList.length)];

    if (!randomVehicle) {
      throw new BadRequestException('No vehicle available to begin the Travel');
    }

    const newTravel = this.beginTravel({
      vehicleId: randomVehicle.id,
      driverId: randomDriver.id,
    })

    return newTravel;
  }

  beginTravel({ vehicleId, driverId, start }: any): any {

    const vehicle = this.vehiclesService.getById(vehicleId);

    if (vehicle.status === 'moving') {
      throw new BadRequestException('Vehicle already traveling');
    }

    const driver = this.driversService.getById(driverId);

    if (driver.status === 'driving') {
      throw new BadRequestException('Driver already traveling');
    }

    const travel = this.postTravel({
      vehicleId,
      driverId,
      start
    });

    this.vehiclesService.patchVehicle(vehicleId, { status: 'moving' })

    this.driversService.patchDriver(driverId, { status: 'driving' })

    return travel;
  }

  stopTravel(travelId: number): any {
    const travel = this.getById(travelId);

    if (!travel) {
      return null;
    }

    travel.end = new Date();
    travel.status = 'finished';
    const finishedTravel = this.putTravel(travel, travelId);

    const vehicle = this.vehiclesService.getById(travel.vehicleId);
    this.vehiclesService.patchVehicle(vehicle.id, { status: 'stopped' });

    const driver = this.driversService.getById(travel.driverId);
    this.driversService.patchDriver(driver.id, { status: 'idle' });

    return finishedTravel;
  }

  getTravelsByDriver(driverId: number): any[] {
    return this.travels.filter((v) => v.driverId == driverId);
  }

  getTravelsByVehicle(vehicleId: number): any[] {
    return this.travels.filter((v) => v.vehicleId == vehicleId);
  }

  getTravelsByStatus(status: string): any[] {
    return this.travels.filter((v) => v.status == status);
  }
}
