import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';  
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { AuthorService } from '../author/services/author.service';


@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService, AuthorService],
  exports: [BookService]
})
export class BookModule {}
