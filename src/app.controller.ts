import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const filePath = path.resolve(__dirname, '../public');
    const filename =
      '/' +
      new Date().getTime().toString() +
      '.' +
      file.originalname.split('.')[1];
    fs.writeFileSync(filePath + filename, file.buffer);
    return 'http://localhost:7749/public' + filename;
  }
  //   [Nest] 3700  - 2022/09/04 12:23:06   ERROR [ExceptionsHandler] Cannot read properties of undefined (reading 'writeFileSync')
  // TypeError: Cannot read properties of undefined (reading 'writeFileSync')
  //     at AppController.uploadFile (C:\coding\site-display-api-nest\src\app.controller.ts:30:8)
  //     at C:\coding\site-display-api-nest\node_modules\@nestjs\core\router\router-execution-context.js:38:29
  //     at processTicksAndRejections (node:internal/process/task_queues:96:5)
  // {
  //   fieldname: 'image',
  //   originalname: 'QQå\x9B¾ç\x89\x8720220816144925.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 01 00 01 00 00 ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c ... 74568 more bytes>,
  //   size: 74618
  // }
}
