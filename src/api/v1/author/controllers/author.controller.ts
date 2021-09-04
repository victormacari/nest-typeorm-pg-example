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
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';

@ApiTags('authors')
@Controller('api/v1/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Added author' })
  @ApiResponse({ status: 400, description: 'Add author failed' })
  async create(@Body() body: CreateAuthorDto): Promise<Author> {
    try {
      const { firstName, lastName, birthday } = body;

      return await this.authorService.create(firstName, lastName, birthday);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all authors' })
  @ApiResponse({ status: 400, description: 'Get all authors failed' })
  async findAll(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get one author' })
  @ApiResponse({ status: 400, description: 'Get one author failed' })
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
  @ApiResponse({ status: 200, description: 'Updated author' })
  @ApiResponse({ status: 400, description: 'Update author failed' })
  async update(
    @Param('id') id: string, 
    @Body() body: UpdateAuthorDto
    ): Promise<Author> {
      try {
        return await this.authorService.update(+id, body);
      } catch (error) {
        throw new BadRequestException(error.mesage);
      }
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Removed author' })
  @ApiResponse({ status: 400, description: 'Remove author failed' })
  async remove(@Param('id') id: string): Promise<Author> {
    try {
      return await this.authorService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
