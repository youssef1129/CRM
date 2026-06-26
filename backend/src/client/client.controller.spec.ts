import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let controller: ClientController;
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
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return the client', async () => {
      const dto = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123456789' };
      const expectedResult = { id: 1, ...dto, animals: [] };
      serviceMock.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(serviceMock.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne and return the client', async () => {
      const expectedResult = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123456789', animals: [] };
      serviceMock.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(1);

      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });
});
