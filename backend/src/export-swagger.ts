import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generate() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('VET API')
    .setDescription('CRM pour vétérinaires')
    .setVersion('1.0')
    .addTag('vet')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  const outputPath = path.resolve(process.cwd(), 'swagger-spec.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  
  await app.close();
  console.log('✅ Swagger spec exported to swagger-spec.json');
}

generate();
