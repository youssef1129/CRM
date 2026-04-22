import { Test } from '@nestjs/testing';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { DATA_SOURCE } from './common/constants';

async function generate() {
  // On crée un module de test qui simule la base de données
  // pour éviter l'erreur de connexion pendant l'export
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DATA_SOURCE)
    .useValue({
      initialize: () => Promise.resolve(),
      getRepository: () => ({
        metadata: { columns: [], relations: [] },
      }),
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api/v1');

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
  console.log('✅ Swagger spec exported to swagger-spec.json (Mocked DB)');
}

generate().catch((err) => {
  console.error('❌ Export failed:', err);
  process.exit(1);
});
