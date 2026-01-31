import { PartialType } from '@nestjs/mapped-types';
import { CreateLprDto } from './create-lpr.dto';

export class UpdateLprDto extends PartialType(CreateLprDto) {
  id: number;
}
