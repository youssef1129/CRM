import { DataSource } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { ANIMAL_REPOSITORY, DATA_SOURCE } from '../common/constants';

export const animalProviders = [
  {
    provide: ANIMAL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Animal),
    inject: [DATA_SOURCE],
  },
];
