import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller('api/v1/authors/:author_id/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(@Param('author_id') author: string) {
    return this.bookService.findAll(author);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Post()
  create(@Param('author_id') author: string,
         @Body() createBookDto: CreateBookDto) {
    return this.bookService.create(author, createBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
