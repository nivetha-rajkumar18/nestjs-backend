import {
  IsOptional,
  IsString,
  IsDateString,
  IsBooleanString,
} from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  createdAfter?: string;

  @IsOptional()
  @IsDateString()
  createdBefore?: string;

  @IsOptional()
  @IsBooleanString()
  stockAvailable?: string;
}
