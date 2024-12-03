import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DriversGateway } from './drivers.gateway';

@Injectable()
export class DriversService {
  private lastUsedId: number = 4;
  private readonly drivers: any[];
  constructor(private driversGateway: DriversGateway) {
    this.drivers = JSON.parse(
      readFileSync(
        join(process.cwd(), 'src/drivers/drivers.data.json'),
        'utf8',
      ),
    );
  }

  getDrivers(): any[] {
    return this.drivers;
  }

  getById(id: number): any {
    return this.drivers.find((v) => v.id == id);
  }

  postDriver(driver: any): any {
    driver.id = ++this.lastUsedId;
    driver.name = driver.name || 'Motorista ' + this.lastUsedId;
    driver.cpf = driver.cpf || '';
    driver.cnh = driver.cnh || '';
    driver.status = 'idle';
    this.drivers.push(driver);

    this.driversGateway.sendCreated(driver);
    return driver;
  }

  putDriver(driver: any, id: number): any {

    const index = this.drivers.findIndex((v) => v.id == id);

    if (index === -1) {
      return null;
    }

    driver.id = id;
    driver.name = driver.name || 'Motorista ' + this.lastUsedId;
    driver.cpf = driver.cpf || '';
    driver.cnh = driver.cnh || '';
    driver.status = driver.status || 'idle';

    this.drivers[index] = driver;

    this.driversGateway.sendUpdated(driver);
    return driver;
  }

  deleteDriver(driverId: number): any {
    const index = this.drivers.findIndex((v) => v.id == driverId);

    if (index === -1) {
      return null;
    }
    const driver = this.drivers[index];
    this.drivers.splice(index, 1);

    this.driversGateway.sendDeleted(driver);
    return driver;
  }

  patchDriver(driverId: number, driver: any): any {
    const index = this.drivers.findIndex((v) => v.id == driverId);
    if (index === -1) {
      return null;
    }
    const updatedDriver = { ...this.drivers[index], ...driver };
    updatedDriver.id = driverId;
    this.drivers[index] = updatedDriver;

    this.driversGateway.sendUpdated(updatedDriver);
    return updatedDriver;
  }

  getDriversByStatus(status: string): any[] {
    return this.drivers.filter((driver) => driver.status == status);
  }

}
