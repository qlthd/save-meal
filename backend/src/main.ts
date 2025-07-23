import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));

  await OpenApiNestFactory.configure(
    app,
    new DocumentBuilder().setTitle('Save meal API').setDescription(''),
    {
      webServerOptions: {
        enabled: true,
        path: 'api-docs',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.json',
      },
      clientGeneratorOptions: {
        enabled: true,
        type: 'typescript-fetch',
        outputFolderPath: '../web/api-client/src',
        openApiFilePath: './openapi.json',
        skipValidation: true,
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    },
  );
  await app.listen(3004);
}
bootstrap();
