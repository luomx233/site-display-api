import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('api一览')
    .setDescription('项目展示-接口一览')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
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
