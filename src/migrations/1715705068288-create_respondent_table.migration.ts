import { MigrationInterface, QueryRunner } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { RESPONDENT_TABLE } from '@/entities';

const table = hCreateTable(RESPONDENT_TABLE, [
  {
    name: 'uuid',
    type: 'varchar',
    isUnique: true,
  },
  {
    name: 'name',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'last_name',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'surname',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'email',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'phone',
    type: 'varchar',
    isNullable: true,
  },
]);

export class CreateRespondentTable1715705068288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
