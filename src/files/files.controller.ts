import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { ApiTags } from '@nestjs/swagger';

import { fileNamer, fileFilter } from './helpers';
import { ConfigService } from '@nestjs/config';


@ApiTags('files GET/UPLOAD')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }

  @Get('/:categoria/:imageName')
  findDocPropietarioImage(
    @Res() res: Response,
    @Param('categoria') categoria: string,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticDocPropietarioImage(categoria, imageName);
    res.sendFile(path);
  }

  @Post('upload/:categoria')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: (req, file, cb) => {
        const directorioDinamico = `./static/${req.params.categoria}/`;
        cb(null, directorioDinamico);
      },
      filename: fileNamer,
    }),
  }))
  uploadDocuments(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any
  ) {
    console.log('Categoria:', req.body.categoria);
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image file');
    }
    const url = `${file.filename}`;
    return {
      url
    };
  }
}
