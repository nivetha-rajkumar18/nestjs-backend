import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service'; // assuming this is the dependency
import { Type } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const mockProductService = {
      // mock your service methods if needed
      findAll: jest.fn().mockReturnValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(
      ProductsController as Type<ProductsController>,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
