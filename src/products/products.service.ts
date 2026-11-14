import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsModule } from './products.module.js';
import { Product } from './entities/product.entity.js';
import { Model, Types } from 'mongoose';
import { ProductDocument } from './schemas/product.schema.js';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel:Model<ProductDocument>,){}
    
  
  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    const product=await this.productModel.findById(id).exec();
    if(!product){
      throw new NotFoundException(`product with id ${id} not found`);
    }
    return product;
  }

  async update(id: Types.ObjectId, updateProductDto: UpdateProductDto) {
    const product=await this.productModel.findByIdAndUpdate(id,updateProductDto,{new:true,
      runValidators:true}).exec();
      if(!product){
        throw new NotFoundException(`product with id ${id} not found`);
      }
      return product;
  }

   async remove(id: Types.ObjectId) {
    const product=await this.productModel.findByIdAndDelete(id).exec();
    if(!product){
      throw new NotFoundException(`product with id ${id} not found`);
    }
    return product;
    
  }
}
