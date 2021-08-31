import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';

@Controller('api/v1/authors/:author_id/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(@Param('author_id') authorId: string): Promise<Book[]> {
    return this.bookService.findAll(+authorId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.verifyBookByID(+id);
  }

  @Post()
  create(@Param('author_id') authorId: string, @Body() body: CreateBookDto) {
    const { title, iban } = body;
    return this.bookService.create(+authorId, title, iban);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return this.bookService.update(+id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
