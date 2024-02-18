import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/docs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Swagger configuration
  SwaggerConfig.config(app);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
