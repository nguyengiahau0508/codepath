import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLangueProblem1767842524139 implements MigrationInterface {
    name = 'UpdateLangueProblem1767842524139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`problem_checkers\` DROP FOREIGN KEY \`FK_380eb75ea1990d3f31dd0e0be96\``);
        await queryRunner.query(`ALTER TABLE \`problem_checkers\` CHANGE \`language_id\` \`programming_language_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`problem_checkers\` ADD CONSTRAINT \`FK_c39d320cb08c648280f653f5b6c\` FOREIGN KEY (\`programming_language_id\`) REFERENCES \`programming_languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`problem_checkers\` DROP FOREIGN KEY \`FK_c39d320cb08c648280f653f5b6c\``);
        await queryRunner.query(`ALTER TABLE \`problem_checkers\` CHANGE \`programming_language_id\` \`language_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`problem_checkers\` ADD CONSTRAINT \`FK_380eb75ea1990d3f31dd0e0be96\` FOREIGN KEY (\`language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
