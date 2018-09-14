import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class ItemQueryDto {
  @IsOptional()
  @IsIn(['NORMAL', 'DECORATION'])
  type: 'NORMAL' | 'DECORATION';
}
