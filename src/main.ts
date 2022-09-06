import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    '/public',
    serveStatic(path.join(__dirname, '../public'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  );
  await app.listen(7749);
}
bootstrap();
