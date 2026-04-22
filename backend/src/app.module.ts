import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [ClientModule, AnimalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
