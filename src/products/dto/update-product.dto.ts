// src/products/dto/update-product.dto.ts

import { PartialType } from '@nestjs/mapped-types'; // Correct import for PartialType
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
