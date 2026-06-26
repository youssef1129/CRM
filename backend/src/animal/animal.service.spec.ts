import { Test, TestingModule } from '@nestjs/testing';
import { AnimalService } from './animal.service';
import { ANIMAL_REPOSITORY } from 'src/common/constants';
import { NotFoundException } from '@nestjs/common';

describe('AnimalService', () => {
  let service: AnimalService;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalService,
        {
          provide: ANIMAL_REPOSITORY,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<AnimalService>(AnimalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new animal', async () => {
      const dto = { firstName: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, clientId: 1 };
      const animal = { id: 1, ...dto, client: { id: 1 } };

      repositoryMock.create.mockReturnValue(animal);
      repositoryMock.save.mockResolvedValue(animal);

      const result = await service.create(dto);

      expect(repositoryMock.create).toHaveBeenCalledWith(dto);
      expect(repositoryMock.save).toHaveBeenCalledWith(animal);
      expect(result).toEqual(animal);
    });
  });

  describe('findOne', () => {
    it('should return an animal if found', async () => {
      const animal = { id: 1, firstName: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, client: { id: 1 } };
      repositoryMock.findOne.mockResolvedValue(animal);

      const result = await service.findOne(1);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['client'],
      });
      expect(result).toEqual(animal);
    });

    it('should throw NotFoundException if animal is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['client'],
      });
    });
  });
});
