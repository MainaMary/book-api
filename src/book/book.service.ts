import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}
  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async createBook(bookPayload: Book): Promise<Book> {
    const book = await this.bookModel.create(bookPayload);
    return book;
  }
  async findById(id: string): Promise<Book> {
    const singleBook = await this.bookModel.findById(id);
    if (!singleBook) {
      throw new NotFoundException('Book not found');
    }
    return singleBook;
  }
  async updateBook(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    return updatedBook;
  }
  async deleteById(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    return deletedBook;
  }
}
