import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  getHello(): string {
    return 'Vet API';
  }

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'OK' };
  }
}
