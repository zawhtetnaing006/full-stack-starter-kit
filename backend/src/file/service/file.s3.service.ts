import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FileServiceInterface } from '../interface/file.service.interface';
import * as mime from 'mime-types';
import { FileUploadDto } from '../dto/file-upload.dto';
import { FileResponseDto } from '../dto/file-response.dto';
import { Upload } from '@aws-sdk/lib-storage';
import { DeleteObjectCommand, GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class FileS3Service implements FileServiceInterface {
  private readonly logger = new Logger(FileS3Service.name);
  private readonly s3: S3;
  private readonly s3BucketName = this.configService.get('AWS_s3_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      },

      region: this.configService.get('AWS_REGION'),
    });
  }

  async upload(fileUploadDto: FileUploadDto): Promise<FileResponseDto> {
    try {
      const mimeType = mime.lookup(fileUploadDto.fileName);

      await new Upload({
        client: this.s3,

        params: {
          Bucket: this.s3BucketName,
          Body: fileUploadDto.file.buffer,
          Key: fileUploadDto.relativePath + '/' + fileUploadDto.fileName,
          ContentType: mimeType,
        },
      }).done();
      return {
        mimeType: mimeType,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error uploading file: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async get(filePath: string): Promise<FileResponseDto> {
    const params = {
      Bucket: this.s3BucketName,
      Key: filePath,
    };

    try {
      const command = new GetObjectCommand(params);
      const response = await this.s3.send(command);
      if (!response.Body) {
        throw new HttpException('File not found in S3', HttpStatus.NOT_FOUND);
      }
      const mimeType = response.ContentType;
      const fileBuffer = await this.streamToBuffer(response.Body as Readable);
      const fileSize = response.ContentLength;

      return {
        file: fileBuffer,
        mimeType,
        size: fileSize,
      };
    } catch (error) {
      this.logger.error(error);
      const statusCode =
        error.name === 'NoSuchKey' ? 404 : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        `Error getting file: ${error.message}`,
        statusCode,
      );
    }
  }
  async delete(filePath: string): Promise<boolean> {
    try {
      const param = {
        Bucket: this.s3BucketName,
        Key: filePath,
      };
      const command = new DeleteObjectCommand(param);
      await this.s3.send(command);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Cannot delete file!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
