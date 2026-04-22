import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { DatabaseModule } from '../database/database.module';
import { clientProviders } from './client.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [...clientProviders, ClientService],
  exports: [ClientService, ...clientProviders],
})
export class ClientModule {}
