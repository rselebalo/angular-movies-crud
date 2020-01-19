import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  overview: string;

  @Column("text")
  rating: number;

  @Column("text")
  genre: string;

  @Column("date")
  release_date: Date;
}
