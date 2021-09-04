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
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';

@Controller('api/v1/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() body: CreateAuthorDto): Promise<Author> {
    try {
      const { firstName, lastName, birthday } = body;

      return await this.authorService.create(firstName, lastName, birthday);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Author> {
    try {
      const author = await this.authorService.findOne(+id);

      if (!author) {
        throw new BadRequestException('Author could not be found');
      }

      return author;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string, 
    @Body() body: UpdateAuthorDto
    ) {
      try {
        return await this.authorService.update(+id, body);
      } catch (error) {
        throw new BadRequestException(error.mesage);
      }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.authorService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
