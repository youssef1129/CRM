import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { CLIENT_REPOSITORY } from 'src/common/constants';
import { NotFoundException } from '@nestjs/common';

describe('ClientService', () => {
  let service: ClientService;
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
        ClientService,
        {
          provide: CLIENT_REPOSITORY,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new client', async () => {
      const dto = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123456789' };
      const client = { id: 1, ...dto, animals: [] };

      repositoryMock.create.mockReturnValue(client);
      repositoryMock.save.mockResolvedValue(client);

      const result = await service.create(dto);

      expect(repositoryMock.create).toHaveBeenCalledWith(dto);
      expect(repositoryMock.save).toHaveBeenCalledWith(client);
      expect(result).toEqual(client);
    });
  });

  describe('findOne', () => {
    it('should return a client if found', async () => {
      const client = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123456789', animals: [] };
      repositoryMock.findOne.mockResolvedValue(client);

      const result = await service.findOne(1);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['animals'],
      });
      expect(result).toEqual(client);
    });

    it('should throw NotFoundException if client is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['animals'],
      });
    });
  });
});
