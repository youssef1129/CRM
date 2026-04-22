import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ClientModule } from '../../client/client.module';
import { AnimalModule } from '../../animal/animal.module';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [DatabaseModule, ClientModule, AnimalModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
