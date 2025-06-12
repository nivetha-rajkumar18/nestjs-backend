import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get('filter')
  filter(@Query() filterDto: FilterProductDto) {
    return this.productService.filterProducts(filterDto);
  }
}
