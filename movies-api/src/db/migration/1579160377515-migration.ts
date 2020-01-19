import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1579160377515 implements MigrationInterface {
    name = 'migration1579160377515'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" text NOT NULL, "overview" text NOT NULL, "rating" text NOT NULL, "genre" text NOT NULL, "release_date" date NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "movie"`, undefined);
    }

}
