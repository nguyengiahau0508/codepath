import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSession1767766424618 implements MigrationInterface {
    name = 'UpdateUserSession1767766424618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`refresh_token_hash\` \`refresh_token_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`expires_at\` \`expires_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`refresh_token_hash\` \`refresh_token_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`expires_at\` \`expires_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`expires_at\` \`expires_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`refresh_token_hash\` \`refresh_token_hash\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`expires_at\` \`expires_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` CHANGE \`refresh_token_hash\` \`refresh_token_hash\` varchar(255) NOT NULL`);
    }

}
