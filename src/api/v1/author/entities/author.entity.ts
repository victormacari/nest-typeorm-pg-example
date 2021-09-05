import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'date' })
  birthday: Date;

  @OneToMany(
    () => Book,
    book => book.author,
  )
  books: Book[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
