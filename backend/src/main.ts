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
    .setTitle('Patas Pirque')
    .setDescription(
      'Documentación sobre la API para la plataforma web Patas Pirque',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addGlobalResponse({
      status: 500,
      description: 'Error en el servidor.',
      example: {
        message: 'Internal server error',
        statusCode: 500,
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
