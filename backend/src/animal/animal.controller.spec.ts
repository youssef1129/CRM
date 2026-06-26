import { Test, TestingModule } from '@nestjs/testing';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

describe('AnimalController', () => {
  let controller: AnimalController;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalController],
      providers: [
        {
          provide: AnimalService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<AnimalController>(AnimalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return the animal', async () => {
      const dto = { firstName: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, clientId: 1 };
      const expectedResult = { id: 1, ...dto, client: { id: 1 } };
      serviceMock.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(serviceMock.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne and return the animal', async () => {
      const expectedResult = { id: 1, firstName: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, client: { id: 1 } };
      serviceMock.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(1);

      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });
});
