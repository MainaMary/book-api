import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from 'src/schemas/book.schema';
import { BookService } from './book.service';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.getAllBooks(query);
  }
  @Post()
  async createBook(@Body() book: CreateBookDto) {
    return this.bookService.createBook(book);
  }
  @Get(':id')
  async getSingleBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }
  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, book);
  }
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.bookService.deleteById(id);
  }
}
