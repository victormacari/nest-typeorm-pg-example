import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';  
import { Book } from './entities/book.entity';
import { AuthorModule } from '../author/author.module'


@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorModule
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
