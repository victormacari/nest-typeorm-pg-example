import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';

@Controller('api/v1/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() body: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName, birthday } = body;
    return this.authorService.create(firstName, lastName, birthday);
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateAuthorDto) {
    return this.authorService.update(+id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
