import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientModule } from './client/client.module';
import { AnimalModule } from './animal/animal.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonController } from './common/common.controller';

@Module({
  imports: [
    ClientModule,
    AnimalModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, CommonController],
  providers: [],
})
export class AppModule {}
