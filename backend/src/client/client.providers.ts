import { DataSource } from 'typeorm';
import { Client } from './entities/client.entity';
import { CLIENT_REPOSITORY, DATA_SOURCE } from '../common/constants';

export const clientProviders = [
  {
    provide: CLIENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Client),
    inject: [DATA_SOURCE],
  },
];
