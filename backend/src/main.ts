import type { IncomingMessage, ServerResponse } from 'node:http';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { toNodeHandler } from 'better-auth/node';

import { AppModule } from './app.module';
import { Env } from './config/env.schema';
import { auth } from './modules/auth/auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // Mount better-auth BEFORE NestJS body parser so it handles its own requests
  const betterAuthHandler = toNodeHandler(auth);
  app.use(
    '/api/auth/*',
    (
      req: IncomingMessage,
      res: ServerResponse,
      next: (err?: unknown) => void,
    ) => {
      void betterAuthHandler(req, res).catch(next);
    },
  );

  // Re-enable body parser for all other routes
  app.useBodyParser('json');
  app.useBodyParser('urlencoded', { extended: true });

  const config = app.get(ConfigService<Env, true>);
  const port = config.get('PORT', { infer: true });

  await app.listen(port);
}
void bootstrap();
