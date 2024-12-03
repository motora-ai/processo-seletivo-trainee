import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  const driverService = app.get('DriversService');
  driverService.postDriver({ name: 'John Doe', age: 30 });
}
bootstrap();
