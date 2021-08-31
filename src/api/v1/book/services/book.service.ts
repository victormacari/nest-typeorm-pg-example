import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {AuthorService } from '../../author/services/author.service'
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(
   @InjectRepository(Book)
   private readonly bookRepository: Repository<Book>,
   private readonly authorService: AuthorService
  ) {}

  getByIBAN(iban: string): Promise<Book> {
    return this.bookRepository.findOne({ iban });
  }

  async verifyBookByID(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new NotFoundException('The book could not be found.');
    }
    
    return book;
  }

  async verifyBookByIBAN(iban: string): Promise<Book> {
    const book = await this.getByIBAN(iban);

    if (book) {
      throw new BadRequestException(`The book ${iban} already exists.`);
    }

    return book;
  }

  async create(author: string, createBookDto: CreateBookDto): Promise<Book> {
    const { iban, title } = createBookDto;

    await this.verifyBookByIBAN(iban);

    const bookAuthor = await this.authorService.findOne(+author);

    const book = new Book();
    book.title = title;
    book.iban = iban;
    book.author = bookAuthor;
    
    await this.bookRepository.save(book);

    return book;
  }

  async findAll(authorId: string): Promise<Book[]> {
    const author = await this.authorService.findOne(+authorId);
    if (!author) {
      throw new NotFoundException(`The author ${authorId} could not be found`)
    }
    return this.bookRepository.find({ author });
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneOrFail(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { iban, title } = updateBookDto;

    await this.verifyBookByID(id);

    await this.verifyBookByIBAN(iban);
     
    const book = await this.bookRepository.findOne(id);
    book.title = title;
    book.iban = iban;
    await this.bookRepository.save(book);

  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
