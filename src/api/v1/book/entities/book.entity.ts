import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  iban: string;

  @ManyToOne(
    () => Author,
    author => author.books,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @Column({ type: 'date', nullable: true })
  publishedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
