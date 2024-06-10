import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'param') return value;
    const id = Number(value);

    if (isNaN(id) || !Number.isInteger(id)) {
      throw new BadRequestException('Wrong id type or format');
    }
    return Number(value);
  }
}
