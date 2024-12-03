import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DriversService } from 'src/drivers/drivers.service';
import { VehicleService } from 'src/vehicles/vehicles.service';

@Injectable()
export class TravelsService {
  private lastUsedId: number = 3;
  private readonly travels: any[];
  constructor(
    private driversService: DriversService,
    private vehiclesService: VehicleService,
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
    travel.end = travel.end || undefined;
    this.travels.push(travel);
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
    travel.end = travel.end || undefined;

    this.travels[index] = travel;
    return travel;
  }

  deleteTravel(travelId: number): any {
    const index = this.travels.findIndex((v) => v.id == travelId);

    if (index === -1) {
      return null;
    }
    const travel = this.travels[index];
    this.travels.splice(index, 1);
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
    return updatedTravel;
  }

  generateRandomTravel(): any {
    const driversList = this.driversService.getDrivers();

    const randomDriver =
      driversList[Math.floor(Math.random() * driversList.length)];

    const vehiclesList = this.vehiclesService.getVehicles();

    const randomVehicle =
      vehiclesList[Math.floor(Math.random() * vehiclesList.length)];

    this.vehiclesService.patchVehicle(randomVehicle.id, { status: 'moving' });

    this.driversService.patchDriver(randomDriver.id, { status: 'driving' });

    const newTravel = this.postTravel({
      vehicleId: randomVehicle.id,
      driverId: randomDriver.id,
      start: new Date(),
    });

    return newTravel;
  }

  stopTravel(travelId: number): any {
    const travel = this.getById(travelId);

    if (!travel) {
      return null;
    }

    travel.end = new Date();

    const vehicle = this.vehiclesService.getById(travel.vehicleId);

    this.vehiclesService.patchVehicle(vehicle.id, { status: 'stopped' });

    const driver = this.driversService.getById(travel.driverId);

    this.driversService.patchDriver(driver.id, { status: 'idle' });

    return travel;
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
