import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { Type } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    }).compile();
    controller = module.get<ProductsController>(
      ProductsController as Type<ProductsController>,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
