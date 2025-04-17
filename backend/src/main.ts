import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

//--------Documentanción de Swagger------------

const config = new DocumentBuilder()
.setTitle("documentación endpoints")
.setDescription("aplicación de login-registro")
.setVersion("1.0")
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Swagger UI →', (await app.getUrl()) + '/docs');
}
bootstrap();
