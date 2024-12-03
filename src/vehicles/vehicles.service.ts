import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VehicleService {
  private lastUsedId: number = 5;
  private readonly vehicles: any[];
  constructor() {
    this.vehicles = JSON.parse(
      readFileSync(
        join(process.cwd(), 'src/vehicles/vehicles.data.json'),
        'utf8',
      ),
    );
  }

  getVehicles(): any[] {
    return this.vehicles;
  }

  getById(id: number): any {
    return this.vehicles.find((v) => v.id == id);
  }

  postVehicle(vehicle: any): any {
    vehicle.id = ++this.lastUsedId;
    vehicle.status = 'stopped';
    vehicle.lat = 51.5049375;
    vehicle.lng = -0.0964509;
    this.vehicles.push(vehicle);
    return vehicle;
  }

  putVehicle(vehicle: any, id: number): any {
    const index = this.vehicles.findIndex((v) => v.id == id);

    if (index === -1) {
      return null;
    }

    vehicle.id = id;
    vehicle.status = vehicle.status || 'stopped';
    vehicle.lat = vehicle.lat || 51.5049375;
    vehicle.lng = vehicle.lng || -0.0964509;

    this.vehicles[index] = vehicle;
    return vehicle;
  }

  deleteVehicle(vehicleId: number): any {
    const index = this.vehicles.findIndex((v) => v.id == vehicleId);

    if (index === -1) {
      return null;
    }
    const vehicle = this.vehicles[index];
    this.vehicles.splice(index, 1);
    return vehicle;
  }

  patchVehicle(vehicleId: string, vehicle: any): any {
    const index = this.vehicles.findIndex((v) => v.id == vehicleId);
    if (index === -1) {
      return null;
    }
    const updatedVehicle = { ...this.vehicles[index], ...vehicle };
    updatedVehicle.id = parseInt(vehicleId);
    this.vehicles[index] = updatedVehicle;
    return updatedVehicle;
  }

  generateRandomVehicleData(): any {
    const randomIndex = Math.floor(Math.random() * this.vehicles.length);
    // generate a random latitude, longitude and speed
    // lat between -20.24571953578169 and -20.265185577202995
    // long between -40.27327454373077 and -40.25906248156139
    // speed between 0 and 100
    const vehicle = this.vehicles[randomIndex];

    vehicle.lat =
      -20.24571953578169 +
      Math.random() * (-20.265185577202995 + 20.24571953578169);

    vehicle.lng =
      -40.27327454373077 +
      Math.random() * (-40.25906248156139 + 40.27327454373077);

    vehicle.speed = Math.floor(Math.random() * 100);

    vehicle.status = 'moving';

    return vehicle;
  }
}
