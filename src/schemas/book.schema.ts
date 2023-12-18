import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type BookDocument = Book & Document;
export enum Category {
  ADVENTURE = 'ADVENTURE',
  CLASSICS = 'CLASSICS',
  CRIME = 'CRIME',
  FANTASY = ' FANTASY',
}
@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  price: number;
  @Prop()
  category: Category;
}
export const BookModel = SchemaFactory.createForClass(Book);
