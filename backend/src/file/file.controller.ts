import { Controller, Get, Query, Res } from '@nestjs/common';
import { FileService } from './service/file.service';
import { Response } from 'express';
import { FileResponseDto } from './dto/file-response.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('')
  async get(@Query('filePath') filePath: string, @Res() res: Response) {
    const file: FileResponseDto = await this.fileService.get(filePath);
    res.setHeader('Content-Type', file.mimeType);
    res.send(file.file);
  }
}
