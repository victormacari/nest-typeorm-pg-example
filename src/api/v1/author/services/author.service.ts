import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>
  ) {}
  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { first_name , last_name, birthday } = createAuthorDto;
    
    const author = new Author();
    author.firstName = first_name;
    author.lastName = last_name;
    author.birthday = birthday;

    await this.authorRepository.save(author);

    return author;
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find({ relations: ['books']});
  }

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOneOrFail(id, { relations: ['books'] });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const { first_name, last_name, birthday } = updateAuthorDto;
    
    const author = await this.authorRepository.findOne(id);
    author.firstName = first_name;
    author.lastName = last_name;
    author.birthday = birthday;

    await this.authorRepository.save(author);

    return author;
  }

  async remove(id: number): Promise<string> {
    await this.authorRepository.delete(id);
    return `Entry ${id} deleted`;
  }
}
