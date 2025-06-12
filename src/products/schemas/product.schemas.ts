import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  stockAvailable: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Export ProductDocument type

export type ProductDocument = Product & Document;
