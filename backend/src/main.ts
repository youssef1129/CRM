import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import * as client from 'prom-client';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
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

  app.getHttpAdapter().get('/metrics', async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
      if (req.path === '/metrics') {
        return;
      }

      const duration = (Date.now() - start) / 1000;
      const route = req.route?.path || req.path;

      httpRequestsTotal.inc({
        method: req.method,
        route,
        status: res.statusCode.toString(),
      });

      httpRequestDuration.observe(
        {
          method: req.method,
          route,
          status: res.statusCode.toString(),
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

bootstrap();
