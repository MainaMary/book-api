import { Category } from 'src/schemas/book.schema';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter the correct category' })
  readonly category: Category;

  @IsOptional()
  @IsNumber()
  readonly price: number;
}
