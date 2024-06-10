import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticDocPropietarioImage(categoria: string, imageName: string) {
    let path;
    if (categoria === 'doc-incidentes')
      path = join(__dirname, '../../static/doc-incidentes', imageName);
    if (categoria === 'doc-seguimientos')
      path = join(__dirname, '../../static/doc-seguimientos', imageName);
    if (!existsSync(path))
      throw new BadRequestException(`Categoria not found with image ${imageName}`);
    return path;
  }
}
