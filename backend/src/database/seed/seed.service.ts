import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { fakerFR as faker } from '@faker-js/faker';
import { Client } from '../../client/entities/client.entity';
import { Animal } from '../../animal/entities/animal.entity';
import { ANIMAL_REPOSITORY, CLIENT_REPOSITORY } from 'src/common/constants';
import { Civility, Species } from 'src/common/enums';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: Repository<Client>,
    @Inject(ANIMAL_REPOSITORY)
    private animalRepository: Repository<Animal>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding...');

    await this.animalRepository.createQueryBuilder().delete().execute();
    await this.clientRepository.createQueryBuilder().delete().execute();

    const clients: Client[] = [];

    for (let i = 0; i < 15; i++) {
      const client = this.clientRepository.create({
        civility: faker.helpers.arrayElement(Object.values(Civility)),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      });
      clients.push(await this.clientRepository.save(client));
    }

    this.logger.log('15 Clients seeded.');

    for (const client of clients) {
      const animalCount = faker.number.int({ min: 1, max: 3 });

      for (let j = 0; j < animalCount; j++) {
        const animal = this.animalRepository.create({
          firstName: faker.person.firstName(),
          age: faker.number.int({ min: 1, max: 15 }),
          height: parseFloat(
            faker.number
              .float({ min: 20, max: 100, fractionDigits: 2 })
              .toString(),
          ),
          weight: parseFloat(
            faker.number
              .float({ min: 2, max: 40, fractionDigits: 2 })
              .toString(),
          ),
          species: faker.helpers.arrayElement(Object.values(Species)),
          client: client,
        });
        await this.animalRepository.save(animal);
      }
    }

    this.logger.log('Animals seeded.');
    this.logger.log('Seeding completed successfully!');
  }
}
