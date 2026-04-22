import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CLIENT_REPOSITORY } from 'src/common/constants';

@Injectable()
export class ClientService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: ['animals'],
      order: { lastName: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    this.clientRepository.merge(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
