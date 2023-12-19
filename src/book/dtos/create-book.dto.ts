import { Category } from 'src/schemas/book.schema';
import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
