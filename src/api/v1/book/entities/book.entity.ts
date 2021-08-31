import { Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  CreateDateColumn,
  Column,
  ManyToOne
 } from 'typeorm'; 
import { Author } from '../../author/entities/author.entity';

@Entity({ name: 'books' })
export class Book {

@PrimaryGeneratedColumn('increment')
id: string;

@Column()
title: string;

@ManyToOne(() => Author, author => author.books, { onDelete: 'CASCADE' })
author: Author;

@Column({ unique: true })
iban: string;

@Column({ name:'published_at',  type: 'date', nullable: true })
publishedAt?: Date;

@CreateDateColumn({ name: 'created_at' })
createdAt: Date;

@UpdateDateColumn({ name: 'updated_at'})
updatedAt: Date;

}