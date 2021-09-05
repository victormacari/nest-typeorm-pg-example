import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorService } from '../../author/services/author.service';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly authorService: AuthorService,
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

  async create(authorId: number, title: string, iban: string): Promise<Book> {
    await this.verifyBookByIBAN(iban);

    const author = await this.authorService.findOne(authorId);

    const book = this.bookRepository.create({ title, iban, author });

    return this.bookRepository.save(book);
  }

  async findAll(authorId: number): Promise<Book[]> {
    const author = await this.authorService.findOne(authorId);
    if (!author) {
      throw new NotFoundException('author not found');
    }
    return this.bookRepository.find({ author });
  }

  async update(id: number, attrs: Partial<Book>): Promise<Book> {
    const book = await this.verifyBookByID(id);

    if (attrs.iban) {
      await this.verifyBookByIBAN(attrs.iban);
    }

    Object.assign(book, attrs);

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.verifyBookByID(id);

    return this.bookRepository.remove(book);
  }
}
