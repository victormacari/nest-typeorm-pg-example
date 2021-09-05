import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { Author } from '../api/v1/author/entities/author.entity';
import { Book } from '../api/v1/book/entities/book.entity';
import { AuthorModule } from '../api/v1/author/author.module';
import { BookModule } from '../api/v1/book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DB_TYPE'),
        database: configService.get('DATABASE'),
        entities: [Author, Book],
        synchronize: true,
      }),
    } as TypeOrmModuleAsyncOptions),
    AuthorModule,
    BookModule,
  ],
})
export class AppModule {}
