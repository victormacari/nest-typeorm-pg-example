import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(
    firstName: string,
    lastName: string,
    birthday: Date,
  ): Promise<Author> {
    const author = this.authorRepository.create({
      firstName,
      lastName,
      birthday,
    });

    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne(id, {
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException('author not found');
    }

    return author;
  }

  async update(id: number, attrs: Partial<Author>): Promise<Author> {
    const author = await this.findOne(id);

    if (!author) {
      throw new NotFoundException('author not found');
    }

    Object.assign(author, attrs);

    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<Author> {
    const author = await this.findOne(id);

    if (!author) {
      throw new NotFoundException('author not found');
    }

    return this.authorRepository.remove(author);
  }
}
