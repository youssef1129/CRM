import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import * as client from 'prom-client';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const register = new client.Registry();

  client.collectDefaultMetrics({
    register,
  });

  const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
  });

  const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  });

  register.registerMetric(httpRequestsTotal);
  register.registerMetric(httpRequestDuration);

  app.use(
    '/metrics',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (req.method !== 'GET') {
        next();
        return;
      }

      res.setHeader('Content-Type', register.contentType);
      res.send(await register.metrics());
    },
  );

  app.use((req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    res.on('finish', () => {
      const requestPath: string = req.path || req.originalUrl || 'unknown';
      const method: string = req.method || 'UNKNOWN';
      const status: string = String(res.statusCode);
      const duration: number = (Date.now() - start) / 1000;

      httpRequestsTotal.inc({
        method,
        route: requestPath,
        status,
      });

      httpRequestDuration.observe(
        {
          method,
          route: requestPath,
          status,
        },
        duration,
      );
    });

    next();
  });

  app.enableCors();

  app.setGlobalPrefix('api/v1', {
    exclude: ['health', 'metrics'],
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('VET API')
    .setDescription('CRM pour vétérinaires')
    .setVersion('1.0')
    .addTag('vet')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8098);
}

void bootstrap();
