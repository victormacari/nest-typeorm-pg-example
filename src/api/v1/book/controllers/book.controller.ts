import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  BadRequestException 
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';

@ApiTags('books')
@Controller('api/v1/authors/:author_id/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get  books by author' })
  @ApiResponse({ status: 400, description: 'Get boooks by author failed' })
  async findAll(@Param('author_id') authorId: string): Promise<Book[]> {
    return await this.bookService.findAll(+authorId);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get one book' })
  @ApiResponse({ status: 400, description: 'Get one book failed' })
  async findOne(@Param('id') id: string): Promise<Book> {
    try {
      const book = await this.bookService.verifyBookByID(+id);

      if (!book) {
        throw new BadRequestException('The book could not be found');
      }
     
      return book;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Added book' })
  @ApiResponse({ status: 400, description: 'Add book failed' })
  async create(
    @Param('author_id') authorId: string, 
    @Body() body: CreateBookDto
    ): Promise<Book> {
    try {
      const { title, iban } = body;

      return await this.bookService.create(+authorId, title, iban);
    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Updated book' })
  @ApiResponse({ status: 400, description: 'Update book failed' })
  async update(
    @Param('id') id: string, 
    @Body() body: UpdateBookDto
    ): Promise<Book> {
      try {
        return await this.bookService.update(+id, body);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Removed book' })
  @ApiResponse({ status: 400, description: 'Remove book failed' })
  async remove(@Param('id') id: string): Promise<Book> {
    try {
      return await this.bookService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
