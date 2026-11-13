import { IsString,IsNumber,IsOptional,Min } from "class-validator";
export class CreateProductDto {
    @IsString()
    name:string;
    @IsNumber()
    @Min(0)
    price:number;
    @IsOptional()
    @IsString()
    description?:string;
    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?:number;
}
