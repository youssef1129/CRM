import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { DatabaseModule } from '../database/database.module';
import { animalProviders } from './animal.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [...animalProviders, AnimalService],
  exports: [AnimalService, ...animalProviders],
})
export class AnimalModule {}
