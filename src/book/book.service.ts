import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Book, BookDocument } from 'src/schemas/book.schema';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}
  async getAllBooks(query: Query): Promise<Book[]> {
    const resultsPerPage = 5;
    const pageNumber = Number(query.page) || 1;
    const skip = resultsPerPage * (pageNumber - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resultsPerPage)
      .skip(skip);
    return books;
  }
  async createBook(bookPayload: Book): Promise<Book> {
    const book = await this.bookModel.create(bookPayload);
    return book;
  }
  async findById(id: string): Promise<Book> {
    const singleBook = await this.bookModel.findById(id);
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Id is not valid');
    }
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
