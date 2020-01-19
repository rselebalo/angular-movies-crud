import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { MovieSeed } from "../seed/movie.seed";
import { Movie } from "../entity/movie";

export class SeedMovie1579121453933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const movieSeed: any = MovieSeed;
    await getRepository(Movie).save(movieSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // do nothing
  }
}
