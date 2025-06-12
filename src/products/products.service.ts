import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schemas';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async filterProducts(filter: FilterProductDto): Promise<ProductDocument[]> {
    const query: {
      name?: { $regex: string; $options: string };
      createdAt?: { $gte?: Date; $lte?: Date };
      stockAvailable?: { $gt?: number; $lte?: number };
    } = {};
    try {
      const { name, createdBefore, createdAfter, stockAvailable } = filter;

      if (name) {
        query.name = { $regex: name, $options: 'i' };
      }

      if (createdBefore || createdAfter) {
        query.createdAt = {};

        if (createdAfter) {
          const afterDate = new Date(createdAfter);
          if (!isNaN(afterDate.getTime())) {
            query.createdAt.$gte = afterDate;
          }
        }

        if (createdBefore) {
          const beforeDate = new Date(createdBefore);
          if (!isNaN(beforeDate.getTime())) {
            query.createdAt.$lte = beforeDate;
          }
        }

        if (Object.keys(query.createdAt).length === 0) {
          delete query.createdAt;
        }
      }

      if (stockAvailable !== undefined && !isNaN(Number(stockAvailable))) {
        query.stockAvailable =
          Number(stockAvailable) > 0 ? { $gt: 0 } : { $lte: 0 };
      }

      return await this.productModel.find(query);
    } catch (error) {
      console.error('Filter Error:', error);
      throw new InternalServerErrorException('Failed to filter products');
    }
  }
}
