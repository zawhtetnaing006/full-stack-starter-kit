import { DynamicModule, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileLocalService } from './service/file.local.service';
import { FileService } from './service/file.service';
import { FileS3Service } from './service/file.s3.service';
import { ConfigService } from '@nestjs/config';

@Module({})
export class FileModule {
  static register(options: { storageDriver?: string } = {}): DynamicModule {
    const config = new ConfigService();
    const storageDriver = options.storageDriver || config.get('STORAGE_DRIVER');

    return {
      module: FileModule,
      controllers: [FileController],
      providers: [
        FileLocalService,
        FileService,
        FileS3Service,
        {
          provide: 'STORAGE_DRIVER',
          useValue: storageDriver,
        },
      ],
      exports: [FileService],
    };
  }
}
