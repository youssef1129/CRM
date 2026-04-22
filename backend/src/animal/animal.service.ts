import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ANIMAL_REPOSITORY } from 'src/common/constants';

@Injectable()
export class AnimalService {
  constructor(
    @Inject(ANIMAL_REPOSITORY)
    private animalRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalRepository.create(createAnimalDto);
    return await this.animalRepository.save(animal);
  }

  async findAll(): Promise<Animal[]> {
    return await this.animalRepository.find({
      relations: ['client'],
      order: { firstName: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const animal = await this.findOne(id);
    this.animalRepository.merge(animal, updateAnimalDto);
    return await this.animalRepository.save(animal);
  }

  async remove(id: number): Promise<void> {
    const animal = await this.findOne(id);
    await this.animalRepository.remove(animal);
  }
}
