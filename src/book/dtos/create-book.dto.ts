import { Category } from 'src/schemas/book.schema';
export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly category: Category;
  readonly price: number;
}
